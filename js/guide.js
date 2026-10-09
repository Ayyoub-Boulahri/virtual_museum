
const DUREE_REGARD = 1.4;      
const DELAI_FERMETURE = 1.2;   
const PERIODE_TESTS = 0.1;    

class Guide {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this.proche = null;     // œuvre la plus proche, visible et de face
    this.regardee = null;   // œuvre au centre de l'écran
    this.cible = null;      // œuvre en cours de fixation
    this.fixation = 0;
    this.ouverte = null;    // œuvre dont la fiche est affichée
    this.absence = 0;
    this.horloge = 0;
    this.attente = 0;

    this.predicat = (m) =>
      m.isPickable && m.isEnabled() && m.isVisible && m.visibility > 0.05 &&
      !(m.metadata && m.metadata.transparent);

    this.creerInterface();
    scene.onBeforeRenderObservable.add(() => {
      this.mettreAJour(scene.getEngine().getDeltaTime() / 1000);
    });
  }

  get oeuvres() {
    return (this.scene.metadata && this.scene.metadata.oeuvres) || [];
  }


  oeuvreDe(mesh) {
    for (let n = mesh; n; n = n.parent) {
      if (n.metadata && n.metadata.oeuvre) return n.metadata.oeuvre;
    }
    return null;
  }

  centre(o) {
    return o.noeud.getAbsolutePosition().add(o.decalage || BABYLON.Vector3.Zero());
  }

  normale(o) {
    if (!o.oriente) return null;
    return BABYLON.Vector3.TransformNormal(BABYLON.Axis.Z, o.noeud.getWorldMatrix()).normalize();
  }

  // Rien ne s'interpose entre la caméra et l'œuvre (murs, plancher, portes...)
  estVisible(o, cam, c, distance) {
    const ray = new BABYLON.Ray(cam, c.subtract(cam).normalize(), distance + 0.3);
    const pick = this.scene.pickWithRay(ray, this.predicat);
    if (!pick.hit) return true;
    return this.oeuvreDe(pick.pickedMesh) === o || pick.distance > distance - 0.05;
  }

  chercherProche() {
    const cam = this.camera.globalPosition;
    let meilleure = null;
    let dmin = Infinity;
    for (const o of this.oeuvres) {
      const c = this.centre(o);
      const d = BABYLON.Vector3.Distance(cam, c);
      if (d > o.rayon || d >= dmin) continue;
      const n = this.normale(o);
      if (n && BABYLON.Vector3.Dot(n, cam.subtract(c)) < 0.25 * d) continue; // de dos ou trop de biais
      if (!this.estVisible(o, cam, c, d)) continue;
      meilleure = o;
      dmin = d;
    }
    return meilleure;
  }

  chercherRegard() {
    const canvas = this.scene.getEngine().getRenderingCanvas();
    const ray = this.scene.createPickingRay(
      canvas.clientWidth / 2, canvas.clientHeight / 2,
      BABYLON.Matrix.Identity(), this.camera, false,
    );
    ray.length = 20;
    const pick = this.scene.pickWithRay(ray, this.predicat);
    if (!pick.hit) return null;
    const o = this.oeuvreDe(pick.pickedMesh);
    return o && pick.distance <= o.porteeRegard ? o : null;
  }

  mettreAJour(dt) {
    if (!(dt > 0) || dt > 0.5) dt = 0.016;
    this.horloge += dt;
    this.attente += dt;
    if (this.attente >= PERIODE_TESTS) {
      this.attente = 0;
      this.proche = this.chercherProche();
      this.regardee = this.chercherRegard();
    }

    // fixation du regard
    const r = this.regardee;
    if (r) {
      if (r !== this.cible) {
        this.cible = r;
        this.fixation = 0;
      }
      this.fixation += dt;
    } else {
      this.fixation = Math.max(0, this.fixation - 2 * dt);
      if (this.fixation === 0) this.cible = null;
    }
    if (this.cible && this.fixation >= DUREE_REGARD && this.ouverte !== this.cible) {
      this.ouvrirFiche(this.cible);
    }

    if (this.ouverte) {
      const encore = this.ouverte === this.proche || this.ouverte === this.regardee;
      this.absence = encore ? 0 : this.absence + dt;
      if (this.absence > DELAI_FERMETURE) this.fermerFiche();
    }

    // l'œuvre donne son nom
    const focus = this.regardee || this.proche;
    this.afficherNom(focus && focus !== this.ouverte ? focus : null);

    const progression = this.cible && this.cible !== this.ouverte ? Math.min(1, this.fixation / DUREE_REGARD) : 0;
    this.viseur.style.setProperty("--p", progression.toFixed(3));
    this.viseur.classList.toggle("actif", progression > 0.02);

    // le halo de l'œuvre concernée s'intensifie et pulse pour attirer l'attention
    for (const o of this.oeuvres) {
      if (!o.halo) continue;
      const vise = o === focus || o === this.ouverte ? 0.92 + 0.08 * Math.sin(this.horloge * 4) : 0.55;
      o.halo.visibility += (vise - o.halo.visibility) * Math.min(1, dt * 5);
    }
  }


  creerInterface() {
    const racine = document.createElement("div");
    racine.id = "guide";
    racine.innerHTML = `
      <div id="guide-viseur"></div>
      <div id="guide-nom">
        <div class="guide-salle"></div>
        <div class="guide-titre"></div>
        <div class="guide-artiste"></div>
        <div class="guide-astuce">Fixez l'œuvre pour la découvrir</div>
      </div>
      <aside id="guide-fiche">
        <div class="guide-fiche-image"><img alt=""></div>
        <div class="guide-fiche-corps">
          <div class="guide-salle"></div>
          <h2 class="guide-titre"></h2>
          <div class="guide-artiste"></div>
          <div class="guide-details"></div>
          <p class="guide-description"></p>
          <div class="guide-anecdote"><span>Le saviez-vous ?</span><p></p></div>
        </div>
      </aside>
      <div id="guide-accueil">
        <div class="guide-accueil-cadre">
          <div class="guide-accueil-sur">Musée virtuel</div>
          <h1>Les Années folles</h1>
          <div class="guide-accueil-dates">1919 — 1929</div>
          <p>Approchez-vous d'une œuvre pour connaître son nom,<br>puis fixez-la du regard pour lire son histoire.</p>
          <div class="guide-accueil-action">Cliquez pour entrer</div>
          <div class="guide-accueil-touches">Z Q S D / flèches : se déplacer · souris : regarder · Échap : quitter</div>
        </div>
      </div>`;
    document.body.appendChild(racine);

    this.viseur = racine.querySelector("#guide-viseur");
    this.bandeau = racine.querySelector("#guide-nom");
    this.fiche = racine.querySelector("#guide-fiche");
    this.accueil = racine.querySelector("#guide-accueil");
    this.nomAffiche = null;

    const canvas = this.scene.getEngine().getRenderingCanvas();
    document.addEventListener("pointerlockchange", () => {
      this.accueil.classList.toggle("cache", document.pointerLockElement === canvas);
    });
  }

  remplir(el, selecteur, texte) {
    const cible = el.querySelector(selecteur);
    cible.textContent = texte || "";
    cible.style.display = texte ? "" : "none";
  }

  afficherNom(o) {
    if (o === this.nomAffiche) return;
    this.nomAffiche = o;
    if (!o) {
      this.bandeau.classList.remove("visible");
      return;
    }
    const i = o.info;
    this.remplir(this.bandeau, ".guide-salle", i.salle);
    this.remplir(this.bandeau, ".guide-titre", i.titre);
    this.remplir(this.bandeau, ".guide-artiste", [i.artiste, i.annee].filter(Boolean).join(" · "));
    this.bandeau.classList.add("visible");
  }

  ouvrirFiche(o) {
    this.ouverte = o;
    this.absence = 0;
    const i = o.info;
    const f = this.fiche;
    const img = f.querySelector(".guide-fiche-image");
    img.style.display = i.image ? "" : "none";
    if (i.image) img.querySelector("img").src = i.image;
    this.remplir(f, ".guide-salle", i.salle);
    this.remplir(f, ".guide-titre", i.titre);
    this.remplir(f, ".guide-artiste", [i.artiste, i.annee].filter(Boolean).join(" · "));
    this.remplir(f, ".guide-details", [i.technique, i.lieu].filter(Boolean).join(" — "));
    this.remplir(f, ".guide-description", i.description);
    const anecdote = f.querySelector(".guide-anecdote");
    anecdote.style.display = i.anecdote ? "" : "none";
    anecdote.querySelector("p").textContent = i.anecdote || "";
    f.classList.add("visible");
  }

  fermerFiche() {
    this.ouverte = null;
    this.fiche.classList.remove("visible");
  }
}

export { Guide };
