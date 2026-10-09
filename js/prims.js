function creerScene() {
  var scn = new BABYLON.Scene(engine);
  scn.gravity = new BABYLON.Vector3(0, -9.8, 0);
  scn.collisionsEnabled = true;
  return scn;
}

function creerCamera(name, options, scn) {
  // console.log("creation camera");
  // Création de la caméra
  // =====================

  const camera = new BABYLON.UniversalCamera(
    name,
    new BABYLON.Vector3(10, 1.7, 5),
    scn,
  );
  camera.setTarget(new BABYLON.Vector3(0.0, 0.7, 0.0));

  camera.minZ = 0.05;

  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(0.5, 0.9, 0.5);
  camera.applyGravity = true;
  camera.keysUp = [90, 38];
  camera.keysDown = [40, 83];
  camera.keysLeft = [81, 37];
  camera.keysRight = [68, 39];
  camera.inertia = 0.01;
  camera.angularSensibility = 1000;

  return camera;
}

function creerReticule(nom, opts, scn) {
  const reticule = BABYLON.MeshBuilder.CreateSphere(
    "reticule",
    { segments: 4, diameter: 0.0025 },
    scn,
  );
  const retMat = new BABYLON.StandardMaterial("reticuleMat", scn);
  retMat.emissiveColor = BABYLON.Color3.Red();
  retMat.specularColor = BABYLON.Color3.Black();
  retMat.diffuseColor = BABYLON.Color3.Black();
  reticule.material = retMat;
  reticule.isPickable = false;
  reticule.position.z = 0.3;

  return reticule;
}

function creerCiel(nom, options, scene) {
  const skyMaterial = new BABYLON.StandardMaterial("mat_skybox", scene);
  skyMaterial.backFaceCulling = false;
  skyMaterial.reflectionTexture = new BABYLON.CubeTexture(
    "./assets/skybox/skybox",
    scene,
  );
  skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  const skyBox = BABYLON.Mesh.CreateBox("skybox", 200, scene);
  skyBox.material = skyMaterial;

  return skyBox;
}

function creerSol(name, options, scn) {
  options = options || {};
  const width = options.largeur || 100.0;
  const height = options.profondeur || width;

  const subdivisions = Math.round(width / 10);

  let materiau = options.materiau || null;

  const sol = BABYLON.MeshBuilder.CreateGround(
    name,
    { width, height, subdivisions },
    scn,
  );

  if (materiau) {
    sol.material = materiau;
  } else {
    materiau = new BABYLON.StandardMaterial("materiau-defaut-" + name, scn);
    materiau.diffuseColor = new BABYLON.Color3(1.0, 0.8, 0.6);
    sol.material = materiau;
  }

  sol.checkCollisions = true;

  return sol;
}

function creerPrairie(name, options, scn) {
  let sol = BABYLON.Mesh.CreateGround(name, 220.0, 220.0, 2.0, scn);
  sol.checkCollisions = true;
  sol.material = new BABYLON.StandardMaterial("blanc", scn);
  // sol.material.diffuseColor  = new BABYLON.Color3(1.0,0,0) ;
  sol.material.diffuseTexture = new BABYLON.Texture(
    "./assets/textures/grass.png",
    scn,
  );
  sol.material.specularTexture = new BABYLON.Texture(
    "./assets/textures/grass.png",
    scn,
  );
  sol.material.emissiveTexture = new BABYLON.Texture(
    "./assets/textures/grass.png",
    scn,
  );
  sol.material.ambientTexture = new BABYLON.Texture(
    "./assets/textures/grass.png",
    scn,
  );
  sol.material.diffuseTexture.uScale = 10.0;
  sol.material.diffuseTexture.vScale = 10.0;
  sol.material.specularTexture.uScale = 10.0;
  sol.material.specularTexture.vScale = 10.0;
  sol.material.emissiveTexture.uScale = 10.0;
  sol.material.emissiveTexture.vScale = 10.0;
  sol.material.ambientTexture.uScale = 10.0;
  sol.material.ambientTexture.vScale = 10.0;
  sol.receiveShadows = true;
  sol.metadata = { type: "ground" };
  return sol;
}

function creerMateriauStandard(nom, options, scn) {
  let rvb = options.couleur || [1, 1, 1];
  const coul = new BABYLON.Color3(rvb[0], rvb[1], rvb[2]);
  let texture = options.texture || null;
  let uScale = options.uScale || 1.0;
  let vScale = options.vScale || 1.0;

  let materiau = new BABYLON.StandardMaterial(nom, scn);
  if (coul != null) materiau.diffuseColor = coul;
  if (texture != null) {
    materiau.diffuseTexture = new BABYLON.Texture(texture, scn);
    materiau.diffuseTexture.uScale = uScale;
    materiau.diffuseTexture.vScale = vScale;
  }
  return materiau;
}

function creerSphere(nom, opts, scn) {
  let options = opts || {};
  let diametre = opts.diametre || 1.0;
  let materiau = opts.materiau || null;

  if (materiau == null) {
    materiau = new BABYLON.StandardMaterial("blanc", scn);
    materiau.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  }

  let sph = BABYLON.Mesh.CreateSphere(nom, 16, diametre, scn);
  sph.material = materiau;

  return sph;
}

function creerBoite(nom, opts, scn) {
  let options = opts || {};
  let width = opts.largeur || 1.0;
  let height = opts.hauteur || 1.0;
  let depth = opts.profondeur || 1.0;
  let hasAlpha = opts.hasAlpha || false;
  let alpha = opts.alpha || 0.0;
  let backFaceCulling = opts.backFaceCulling || true;
  let materiau = opts.materiau || null;

  if (materiau == null) {
    materiau = new BABYLON.StandardMaterial("blanc", scn);
    materiau.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  }
  if (hasAlpha) {
    materiau.alpha = alpha; // transparencia
    materiau.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0); // reflejo blanco
    materiau.backFaceCulling = backFaceCulling; // ver las dos caras (muy importante)
    console.log("#################################");
  }

  let box = BABYLON.MeshBuilder.CreateBox(nom, { width, height, depth }, scn);
  box.material = materiau;

  return box;
}

// La scène est en repère main droite (useRightHandedSystem) : un plan retourné de PI
// affiche sa texture en miroir. On inverse donc la coordonnée u de ces textures.
function corrigerMiroir(tex) {
  tex.uScale = -1;
  tex.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
  return tex;
}

// ---------------------------------------------------------------------------
// Ressources partagées : une seule instance par scène (matériaux, textures)
// ---------------------------------------------------------------------------
function partage(scn, cle, fabrique) {
  scn.metadata = scn.metadata || {};
  scn.metadata.partage = scn.metadata.partage || {};
  if (!scn.metadata.partage[cle]) scn.metadata.partage[cle] = fabrique();
  return scn.metadata.partage[cle];
}

// style : "dore" | "noir" | "bois" | "photo" (cadre noir fin)
function materiauCadre(style, scn) {
  if (style === "photo") style = "noir";
  return partage(scn, "cadre-" + style, () => {
    if (style === "bois") {
      const m = new BABYLON.StandardMaterial("mat-cadre-bois", scn);
      m.diffuseTexture = new BABYLON.Texture("./assets/wood.jpg", scn);
      m.diffuseColor = new BABYLON.Color3(0.75, 0.6, 0.5);
      m.specularColor = new BABYLON.Color3(0.18, 0.15, 0.12);
      m.specularPower = 48;
      return m;
    }
    const m = new BABYLON.PBRMaterial("mat-cadre-" + style, scn);
    m.usePhysicalLightFalloff = false;
    if (style === "noir") {
      m.albedoColor = new BABYLON.Color3(0.02, 0.02, 0.02);
      m.metallic = 0.1;
      m.roughness = 0.4;
    } else {
      m.albedoColor = new BABYLON.Color3(0.8, 0.58, 0.24);
      m.metallic = 0.95;
      m.roughness = 0.3;
    }
    return m;
  });
}

function materiauUni(cle, couleur, scn, emissif) {
  return partage(scn, cle, () => {
    const m = new BABYLON.StandardMaterial(cle, scn);
    m.diffuseColor = couleur;
    m.specularColor = BABYLON.Color3.Black();
    if (emissif) {
      m.emissiveColor = couleur;
      m.disableLighting = true;
    }
    return m;
  });
}

// Tache de lumière chaude projetée sur le mur derrière un tableau (sans lumière réelle :
// une lumière par halo saturait vite le nombre de lumières par matériau)
function materiauHalo(scn) {
  return partage(scn, "mat-halo", () => {
    const T = 256;
    const tex = new BABYLON.DynamicTexture("tex-halo", { width: T, height: T }, scn, true);
    const ctx = tex.getContext();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, T, T);
    const g = ctx.createRadialGradient(T / 2, T * 0.42, 0, T / 2, T / 2, T / 2);
    g.addColorStop(0.0, "rgba(255, 214, 160, 0.55)");
    g.addColorStop(0.5, "rgba(255, 196, 130, 0.22)");
    g.addColorStop(1.0, "rgba(255, 180, 110, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, T, T);
    tex.update();

    const m = new BABYLON.StandardMaterial("mat-halo", scn);
    m.diffuseColor = BABYLON.Color3.Black();
    m.specularColor = BABYLON.Color3.Black();
    m.emissiveTexture = tex;
    m.disableLighting = true;
    m.alpha = 0.999; // force le mélange additif
    m.alphaMode = BABYLON.Engine.ALPHA_ADD;
    m.disableDepthWrite = true;
    m.backFaceCulling = false;
    return m;
  });
}

// Réduit la police jusqu'à ce que le texte tienne dans la largeur donnée
function policeAjustee(ctx, texte, style, taille, famille, largeurMax) {
  let t = taille;
  do {
    ctx.font = `${style} ${t}px ${famille}`;
    t -= 2;
  } while (ctx.measureText(texte).width > largeurMax && t > 12);
}

// Petite plaque (cartel) : titre, artiste, date
function creerCartel(nom, info, largeur, scn) {
  const W = 768, H = 240;
  const tex = new BABYLON.DynamicTexture("tex-cartel-" + nom, { width: W, height: H }, scn, true);
  const ctx = tex.getContext();
  ctx.fillStyle = "#17130e";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#c9a45c";
  ctx.lineWidth = 5;
  ctx.strokeRect(14, 14, W - 28, H - 28);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#f3e7cf";
  policeAjustee(ctx, info.titre, "italic bold", 58, "Georgia, serif", W - 90);
  ctx.fillText(info.titre, W / 2, 92);
  const ligne2 = [info.artiste, info.annee].filter(Boolean).join(" · ");
  ctx.fillStyle = "#c9a45c";
  policeAjustee(ctx, ligne2, "", 38, "Georgia, serif", W - 90);
  ctx.fillText(ligne2, W / 2, 165);
  tex.update();

  const mat = new BABYLON.StandardMaterial("mat-cartel-" + nom, scn);
  mat.diffuseColor = BABYLON.Color3.Black();
  mat.specularColor = BABYLON.Color3.Black();
  mat.emissiveTexture = corrigerMiroir(tex);
  mat.disableLighting = true;

  const hauteur = largeur * H / W;
  const groupe = new BABYLON.TransformNode("cartel-" + nom, scn);
  const plaque = BABYLON.MeshBuilder.CreatePlane("plaque-" + nom, { width: largeur, height: hauteur }, scn);
  plaque.rotation.y = Math.PI;
  plaque.position.z = 0.012;
  plaque.material = mat;
  plaque.parent = groupe;
  const socle = BABYLON.MeshBuilder.CreateBox("socle-cartel-" + nom, { width: largeur + 0.02, height: hauteur + 0.02, depth: 0.02 }, scn);
  socle.material = materiauCadre("dore", scn);
  socle.parent = groupe;
  return groupe;
}

// Inscrit une œuvre auprès du guide de visite (nom à l'approche, description au regard)
//  entree = { noeud, info, rayon, porteeRegard, decalage (Vector3 monde), oriente, halo }
function enregistrerOeuvre(scn, entree) {
  scn.metadata = scn.metadata || {};
  scn.metadata.oeuvres = scn.metadata.oeuvres || [];
  scn.metadata.oeuvres.push(entree);
  entree.noeud.metadata = Object.assign(entree.noeud.metadata || {}, { oeuvre: entree });
  return entree;
}

// Les 4 montants d'un cadre autour d'une ouverture L x H
function montantsCadre(nom, L, H, ep, prof, z, mat, parent, scn) {
  const morceaux = [
    { w: L + 2 * ep, h: ep, x: 0, y: (H + ep) / 2 },
    { w: L + 2 * ep, h: ep, x: 0, y: -(H + ep) / 2 },
    { w: ep, h: H, x: -(L + ep) / 2, y: 0 },
    { w: ep, h: H, x: (L + ep) / 2, y: 0 },
  ];
  return morceaux.map((m, i) => {
    const b = BABYLON.MeshBuilder.CreateBox(nom + "-" + i, { width: m.w, height: m.h, depth: prof }, scn);
    b.position.set(m.x, m.y, z);
    b.material = mat;
    b.parent = parent;
    return b;
  });
}

// Tableau encadré. Le côté visible est le +z local du groupe.
// Options : tableau, largeur, hauteur, spot, halo,
//           cadre ("dore" | "noir" | "bois" | "photo" | false), lampe (bool),
//           info ({ titre, artiste, annee, ... }) -> cartel + inscription au guide
function creerPoster(nom, opts, scn) {
  let options = opts || {};
  let hauteur = options["hauteur"] || 1.0;
  let largeur = options["largeur"] || 1.0;
  let textureName = options["tableau"] || "";
  let avecSpot = options["spot"] || false;
  let avecHalo = options["halo"] || false;
  let style = options["cadre"] === undefined ? "dore" : options["cadre"];
  let avecLampe = options["lampe"] === undefined ? avecSpot : options["lampe"];
  let info = options["info"] || null;

  const taille = Math.max(largeur, hauteur);

  var group = new BABYLON.TransformNode("group-" + nom, scn);

  var tableau1 = BABYLON.MeshBuilder.CreatePlane("tableau-" + nom, { width: largeur, height: hauteur }, scn);
  var verso = BABYLON.MeshBuilder.CreatePlane("verso-" + nom, { width: largeur, height: hauteur }, scn);
  tableau1.parent = group;
  verso.position.z = -0.01;
  verso.parent = group;
  tableau1.rotation.y = Math.PI;

  var mat = new BABYLON.StandardMaterial("tex-tableau-" + nom, scn);
  mat.diffuseTexture = corrigerMiroir(new BABYLON.Texture(textureName, scn));
  mat.diffuseTexture.anisotropicFilteringLevel = 8;
  // Un peu d'auto-illumination : le tableau reste lisible même loin des lumières
  mat.emissiveTexture = corrigerMiroir(new BABYLON.Texture(textureName, scn));
  mat.emissiveTexture.level = 0.22;
  mat.specularColor = new BABYLON.Color3(0.03, 0.03, 0.03);
  mat.maxSimultaneousLights = 3;
  mat.metadata = { lumieresFixees: true };
  tableau1.material = mat;

  tableau1.checkCollisions = true;

  // --- passe-partout (photos) et cadre
  const pieces = [tableau1];
  let marge = 0;
  if (style === "photo") {
    marge = 0.06 + 0.05 * taille;
    const pp = BABYLON.MeshBuilder.CreatePlane("passe-partout-" + nom, { width: largeur + 2 * marge, height: hauteur + 2 * marge }, scn);
    pp.rotation.y = Math.PI;
    pp.position.z = -0.004;
    pp.material = materiauUni("mat-passe-partout", new BABYLON.Color3(0.93, 0.91, 0.86), scn);
    pp.parent = group;
    pieces.push(pp);
  }
  const L = largeur + 2 * marge;
  const H = hauteur + 2 * marge;

  let ep = 0;
  if (style) {
    ep = {
      dore: Math.min(0.2, 0.06 + 0.03 * taille),
      bois: Math.min(0.14, 0.05 + 0.02 * taille),
      noir: 0.035 + 0.01 * taille,
      photo: 0.03,
    }[style] || 0.08;
    const cadre = montantsCadre("cadre-" + nom, L, H, ep, 0.07, -0.015, materiauCadre(style, scn), group, scn);
    pieces.push(...cadre);
    if (style === "dore") {
      // filet sombre intérieur qui donne de la profondeur au cadre doré
      const filet = montantsCadre("filet-" + nom, L, H, 0.015, 0.03, 0.006,
        materiauUni("mat-filet", new BABYLON.Color3(0.08, 0.06, 0.04), scn), group, scn);
      pieces.push(...filet);
    }
  }
  const Lext = L + 2 * ep;
  const Hext = H + 2 * ep;

  // --- lampe de tableau en laiton au-dessus du cadre
  if (avecLampe) {
    const longueur = Math.min(2.4, Math.max(0.4, 0.55 * Lext));
    const yL = Hext / 2 + 0.16;
    const laiton = materiauCadre("dore", scn);
    const barre = BABYLON.MeshBuilder.CreateCylinder("lampe-" + nom, { height: longueur, diameter: 0.07, tessellation: 20 }, scn);
    barre.rotation.z = Math.PI / 2;
    barre.position.set(0, yL, 0.24);
    barre.material = laiton;
    barre.parent = group;
    const ampoule = BABYLON.MeshBuilder.CreateBox("ampoule-" + nom, { width: longueur * 0.92, height: 0.014, depth: 0.035 }, scn);
    ampoule.position.set(0, yL - 0.035, 0.24);
    ampoule.material = materiauUni("mat-ampoule", new BABYLON.Color3(1.0, 0.86, 0.62), scn, true);
    ampoule.metadata = { glow: true };
    ampoule.isPickable = false;
    ampoule.parent = group;
    for (const s of [-1, 1]) {
      const bras = BABYLON.MeshBuilder.CreateBox("bras-" + nom + s, { width: 0.025, height: 0.025, depth: 0.28 }, scn);
      bras.position.set(s * longueur * 0.3, yL - 0.06, 0.11);
      bras.rotation.x = -0.4;
      bras.material = laiton;
      bras.parent = group;
    }
  }

  if (avecSpot) {
    const recul = Math.max(1.4, 0.45 * taille);
    let pos = new BABYLON.Vector3(0, hauteur / 2 + 1.0, recul);
    let direction = BABYLON.Vector3.Zero().subtract(pos).normalize();
    let angle = Math.min(2.3, 2 * Math.atan((Math.max(Lext, Hext) / 2 + 0.1) / pos.length()) * 1.25);

    var spot = new BABYLON.SpotLight("spot-" + nom, pos, direction, angle, 2, scn);
    spot.parent = group;
    spot.intensity = 1.25;
    spot.range = pos.length() + 4;
    spot.diffuse = new BABYLON.Color3(1.0, 0.9, 0.76);
    spot.specular = new BABYLON.Color3(0.25, 0.22, 0.18);
    spot.includedOnlyMeshes = pieces;
    spot.renderPriority = 2;
  }

  let halo = null;
  if (avecHalo) {
    halo = BABYLON.MeshBuilder.CreatePlane("halo-" + nom, { width: Lext * 1.35 + 1.2, height: Hext * 1.3 + 1.2 }, scn);
    halo.rotation.y = Math.PI;
    halo.position.set(0, 0.12 * Hext, -0.06);
    halo.material = materiauHalo(scn);
    halo.visibility = 0.55;
    halo.isPickable = false;
    halo.parent = group;
  }

  if (info) {
    const lc = Math.min(0.75, Math.max(0.5, 0.3 * taille));
    const cartel = creerCartel(nom, info, lc, scn);
    cartel.parent = group;
    cartel.position.set(0, -Hext / 2 - 0.1 - lc * 0.16, 0);

    enregistrerOeuvre(scn, {
      noeud: group,
      info: info,
      halo: halo,
      oriente: true,
      rayon: Math.max(4, 1.5 * taille),
      porteeRegard: Math.max(6, 3 * taille),
      decalage: BABYLON.Vector3.Zero(),
    });
  }

  return group;
}

// Panneau de signalétique Art déco : un surtitre doré et un titre
function creerPanneau(nom, opts, scn) {
  const options = opts || {};
  const largeur = options.largeur || 3;
  const hauteur = options.hauteur || 0.6;
  const W = 1024, H = Math.round(1024 * hauteur / largeur);
  const tex = new BABYLON.DynamicTexture("tex-panneau-" + nom, { width: W, height: H }, scn, true);
  const ctx = tex.getContext();
  ctx.fillStyle = "#14110c";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#c9a45c";
  ctx.lineWidth = Math.max(3, H * 0.025);
  ctx.strokeRect(H * 0.08, H * 0.08, W - H * 0.16, H - H * 0.16);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(H * 0.13, H * 0.13, W - H * 0.26, H - H * 0.26);
  // éventails Art déco aux deux extrémités
  for (const cx of [H * 0.55, W - H * 0.55]) {
    for (let i = 0; i < 7; i++) {
      const a = Math.PI + (i / 6) * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, H * 0.7);
      ctx.lineTo(cx + Math.cos(a) * H * 0.34, H * 0.7 + Math.sin(a) * H * 0.34);
      ctx.stroke();
    }
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const avecSurtitre = !!options.surtitre;
  if (avecSurtitre) {
    ctx.fillStyle = "#c9a45c";
    policeAjustee(ctx, options.surtitre, "bold", Math.round(H * 0.2), "Georgia, serif", W - H * 1.6);
    ctx.fillText(options.surtitre.split("").join(String.fromCharCode(8202)), W / 2, H * 0.33);
  }
  ctx.fillStyle = "#f3e7cf";
  policeAjustee(ctx, options.titre || "", "italic", Math.round(H * (avecSurtitre ? 0.27 : 0.36)), "Georgia, serif", W - H * 1.6);
  ctx.fillText(options.titre || "", W / 2, avecSurtitre ? H * 0.64 : H * 0.52);
  tex.update();

  const mat = new BABYLON.StandardMaterial("mat-panneau-" + nom, scn);
  mat.diffuseColor = BABYLON.Color3.Black();
  mat.specularColor = BABYLON.Color3.Black();
  mat.emissiveTexture = corrigerMiroir(tex);
  mat.disableLighting = true;

  const groupe = new BABYLON.TransformNode("panneau-" + nom, scn);
  const face = BABYLON.MeshBuilder.CreatePlane("face-panneau-" + nom, { width: largeur, height: hauteur }, scn);
  face.rotation.y = Math.PI;
  face.position.z = 0.026;
  face.material = mat;
  face.parent = groupe;
  const socle = BABYLON.MeshBuilder.CreateBox("socle-panneau-" + nom, { width: largeur + 0.06, height: hauteur + 0.06, depth: 0.05 }, scn);
  socle.material = materiauCadre("dore", scn);
  socle.parent = groupe;
  return groupe;
}

// Banc de musée : assise en bois sur piètement noir
function creerBanc(nom, opts, scn) {
  const options = opts || {};
  const longueur = options.longueur || 2.2;
  const groupe = new BABYLON.TransformNode("banc-" + nom, scn);
  const assise = BABYLON.MeshBuilder.CreateBox("assise-" + nom, { width: longueur, height: 0.08, depth: 0.55 }, scn);
  assise.position.y = 0.44;
  assise.material = options.materiau || materiauCadre("bois", scn);
  assise.checkCollisions = true;
  assise.parent = groupe;
  for (const s of [-1, 1]) {
    const pied = BABYLON.MeshBuilder.CreateBox("pied-" + nom + s, { width: 0.06, height: 0.4, depth: 0.48 }, scn);
    pied.position.set(s * (longueur / 2 - 0.15), 0.2, 0);
    pied.material = materiauCadre("noir", scn);
    pied.checkCollisions = true;
    pied.parent = groupe;
  }
  return groupe;
}

// Suspension Art déco : tige, coupelle dorée, globe lumineux
function creerSuspension(nom, opts, scn) {
  const options = opts || {};
  const longueurTige = options.tige || 1.5;
  const diametre = options.diametre || 0.7;
  const groupe = new BABYLON.TransformNode("suspension-" + nom, scn);
  const laiton = materiauCadre("dore", scn);
  const tige = BABYLON.MeshBuilder.CreateCylinder("tige-" + nom, { height: longueurTige, diameter: 0.025 }, scn);
  tige.position.y = longueurTige / 2;
  tige.material = laiton;
  tige.parent = groupe;
  const coupelle = BABYLON.MeshBuilder.CreateCylinder("coupelle-" + nom,
    { height: diametre * 0.35, diameterTop: diametre * 0.25, diameterBottom: diametre, tessellation: 8 }, scn);
  coupelle.position.y = diametre * 0.175;
  coupelle.material = laiton;
  coupelle.parent = groupe;
  const globe = BABYLON.MeshBuilder.CreateSphere("globe-" + nom, { diameter: diametre * 0.8, segments: 16, slice: 0.5 }, scn);
  globe.rotation.x = Math.PI;
  globe.position.y = 0.01;
  globe.material = materiauUni("mat-globe", new BABYLON.Color3(1.0, 0.88, 0.7), scn, true);
  globe.metadata = { glow: true };
  globe.isPickable = false;
  globe.parent = groupe;
  return groupe;
}

// Plafonnier encastré (disque lumineux cerclé de laiton), à poser sous un plafond
function creerPlafonnier(nom, opts, scn) {
  const options = opts || {};
  const diametre = options.diametre || 0.9;
  const groupe = new BABYLON.TransformNode("plafonnier-" + nom, scn);
  const anneau = BABYLON.MeshBuilder.CreateCylinder("anneau-" + nom, { height: 0.05, diameter: diametre, tessellation: 32 }, scn);
  anneau.material = materiauCadre("dore", scn);
  anneau.parent = groupe;
  const disque = BABYLON.MeshBuilder.CreateCylinder("disque-" + nom, { height: 0.06, diameter: diametre * 0.8, tessellation: 32 }, scn);
  disque.material = materiauUni("mat-globe", new BABYLON.Color3(1.0, 0.88, 0.7), scn, true);
  disque.metadata = { glow: true };
  disque.isPickable = false;
  disque.parent = groupe;
  return groupe;
}

function creerCloison(nom, opts, scn) {
  let options = opts || {};
  let hauteur = options.hauteur || 3.0;
  let largeur = options.largeur || 5.0;
  let epaisseur = options.epaisseur || 0.1;

  let materiau =
    options.materiau || new BABYLON.StandardMaterial("materiau-pos" + nom, scn);

  let groupe = new BABYLON.TransformNode("groupe-" + nom);

  let cloison = BABYLON.MeshBuilder.CreateBox(
    nom,
    { width: largeur, height: hauteur, depth: epaisseur },
    scn,
  );
  cloison.material = materiau;
  cloison.parent = groupe;
  cloison.position.y = hauteur / 2.0;

  cloison.checkCollisions = true;

  return groupe;
}

function creerCloisonEtTrou(nom, opts, scn) {
  let options = opts || {};
  let optionsCloison = options.cloison || {};
  let optionsTrou = options.trou || {};

  // Crear grupo padre
  const groupe = creerCloison(nom, optionsCloison, scn);
  // Obtener mesh de la pared
  const cloison = groupe.getChildMeshes()[0];

  // Crear el agujero
  const trouGroupe = creerCloison("mur_" + nom, optionsTrou, scn);
  // Ubicar el agujero respecto a la pared
  const pos =
    opts.trou.position || new BABYLON.Vector3(0, opts.trou.hauteur / 2.0, 0);
  trouGroupe.position = cloison.position.add(pos);

  // Boolean: restar el agujero
  const csgCloison = BABYLON.CSG.FromMesh(cloison);
  const csgTrou = BABYLON.CSG.FromMesh(trouGroupe.getChildMeshes()[0]);
  const csgResult = csgCloison.subtract(csgTrou);

  // Generar la mesh de la pared sin el agujero con un material
  const nouvelleCloison = csgResult.toMesh(
    "cloison-avec-trou-" + nom,
    cloison.material,
    scn,
  );
  nouvelleCloison.checkCollisions = true;
  nouvelleCloison.parent = groupe;

  // Limpiar
  cloison.dispose();
  trouGroupe.getChildMeshes()[0].dispose();

  return groupe;
}

function creuser(mesh0, mesh1) {
  const csg0 = BABYLON.CSG.FromMesh(mesh0);
  const csg1 = BABYLON.CSG.FromMesh(mesh1);
  csg0.subtractInPlace(csg1);
  const csgMesh = csg0.toMesh();
  mesh0.dispose();
  mesh1.dispose();
  return csgMesh;
}

function creerPersonne(nom, opts, scn) {
  let options = opts || {};
  let hauteur = options.hauteur || 0.5;
  let largeur = options.largeur || 0.5;
  let epaisseur = options.epaisseur || 0.5;
  let diametre = options.diametre || 0.1;

  let materiau =
    options.materiau || new BABYLON.StandardMaterial("materiau-pos" + nom, scn);
  let eye_material =
    options.eye_material ||
    new BABYLON.StandardMaterial("materiau-pos" + nom, scn);
  let body_material =
    options.body_material ||
    new BABYLON.StandardMaterial("materiau-pos" + nom, scn);
  let hair_material = options.hair_material;

  if (!hair_material) {
    hair_material = new BABYLON.StandardMaterial("materiau-pos" + nom, scn);
    hair_material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  } //noir

  let groupe = new BABYLON.TransformNode("groupe-" + nom);

  let body = BABYLON.MeshBuilder.CreateBox(
    nom,
    { width: largeur * 2, height: hauteur * 4, depth: epaisseur * 2 },
    scn,
  );
  body.material = body_material;
  body.parent = groupe;
  body.position.y = hauteur * 2;

  let head = BABYLON.MeshBuilder.CreateBox(
    nom,
    { width: largeur, height: hauteur * 0.8, depth: epaisseur },
    scn,
  );
  head.material = materiau;
  head.parent = groupe;
  head.position.y = hauteur * 4 + (hauteur * 0.8) / 2.0;

  let hair = BABYLON.MeshBuilder.CreateBox(
    nom,
    { width: largeur, height: hauteur * 0.2, depth: epaisseur },
    scn,
  );
  hair.material = hair_material;
  hair.parent = groupe;
  hair.position.y = hauteur * 4 + hauteur * 0.8 + 0.1 * hauteur;

  let eye_L = BABYLON.MeshBuilder.CreateSphere(
    nom,
    { diameter: diametre },
    scn,
  );
  eye_L.material = eye_material;
  eye_L.parent = groupe;
  eye_L.position.x = largeur / 5;
  eye_L.position.y = hauteur * 4 + hauteur / 2.0;
  eye_L.position.z = largeur / 2;
  eye_L.rotation.y = (2 * Math.PI) / 4;

  let eye_R = BABYLON.MeshBuilder.CreateSphere(
    nom,
    { diameter: diametre },
    scn,
  );
  eye_R.material = eye_material;
  eye_R.parent = groupe;
  eye_R.position.x = -largeur / 5;
  eye_R.position.y = hauteur * 4 + hauteur / 2.0;
  eye_R.position.z = largeur / 2;
  eye_R.rotation.y = (2 * Math.PI) / 4;

  return groupe;
}

function wallWithHole(nom, opts, scn) {
  const groupe = creerCloison(nom, opts.cloison, scn);
  const cloison = groupe.getChildMeshes()[0];

  const trou = creerCloison(`${nom}_trou`, opts.trou, scn);

  const pos =
    opts.trou.position || new BABYLON.Vector3(0, opts.trou.hauteur / 2, 0);

  trou.position = cloison.position.clone().add(pos);

  const trouMesh = trou.getChildMeshes()[0];

  const csgWall = BABYLON.CSG.FromMesh(cloison);
  const csgTrou = BABYLON.CSG.FromMesh(trouMesh);

  const wall = csgWall.subtract(csgTrou).toMesh(nom, cloison.material, scn);

  wall.checkCollisions = true;
  wall.parent = groupe;

  trou.dispose();
  cloison.dispose();

  return groupe;
}

function creerCloisonAvecTrous(nom, opts, scn) {
  let options = opts || {};
  let optionsCloison = options.cloison || {};
  let trous = options.trous || []; // Array de huecos

  // Crear grupo padre y obtener la pared base
  const groupe = creerCloison(nom, optionsCloison, scn);
  const cloison = groupe.getChildMeshes()[0];

  // CSG base
  let csgCloison = BABYLON.CSG.FromMesh(cloison);

  // Para cada hueco
  for (let i = 0; i < trous.length; i++) {
    let trouOpts = trous[i];
    let trouGroup = creerCloison(`trou_${nom}_${i}`, trouOpts, scn);
    let pos =
      trouOpts.position || new BABYLON.Vector3(0, trouOpts.hauteur / 2.0, 0);
    trouGroup.position = cloison.position.add(pos);

    const trouMesh = trouGroup.getChildMeshes()[0];
    const csgTrou = BABYLON.CSG.FromMesh(trouMesh);
    csgCloison = csgCloison.subtract(csgTrou);

    trouMesh.dispose();
  }

  const nouvelleCloison = csgCloison.toMesh(
    `cloison-avec-trous-${nom}`,
    cloison.material,
    scn,
  );
  nouvelleCloison.checkCollisions = true;
  nouvelleCloison.parent = groupe;

  const boisMat = new BABYLON.StandardMaterial("fenetre", scn);

  for (let i = 0; i < trous.length; i++) {
    let trouOpts = trous[i];
    if (trouOpts.fenetre) {
      if (scn.textures.find((t) => t.name === trouOpts.materiau)) {
        boisMat.diffuseTexture = new BABYLON.Texture(trouOpts.materiau);
      } else {
        boisMat.diffuseTexture = new BABYLON.Texture("./assets/rock.jpg", scn);
      }
      boisMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
      // Reflejo ambiental (HDR o skybox)
      var hdrTexture = new BABYLON.HDRCubeTexture(
        "./assets/skybox/partly_cloudy_puresky.hdr",
        scn,
        512,
      );

      // Skybox
      var hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scn);
      var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scn);
      hdrSkyboxMaterial.backFaceCulling = false;
      hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
      hdrSkyboxMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE;
      hdrSkyboxMaterial.microSurface = 1.0;
      hdrSkyboxMaterial.cameraExposure = 0.66;
      hdrSkyboxMaterial.cameraContrast = 1.66;
      hdrSkyboxMaterial.disableLighting = true;
      hdrSkybox.material = hdrSkyboxMaterial;
      hdrSkybox.infiniteDistance = true;

      var glass = new BABYLON.PBRMaterial("glass", scn);
      glass.reflectionTexture = hdrTexture;
      glass.indexOfRefraction = 0.52;
      glass.alpha = 0.5;
      glass.directIntensity = 0.0;
      glass.environmentIntensity = 0.7;
      glass.cameraExposure = 0.66;
      glass.cameraContrast = 1.66;
      glass.microSurface = 1;
      glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      glass.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);

      let frameOpts = trouOpts;
      frameOpts.materiau = boisMat;
      let frameGroupe = creerCloison(`trou_frame_${nom}_${i}`, frameOpts, scn);
      frameGroupe.parent = nouvelleCloison;
      let pos =
        frameOpts.position ||
        new BABYLON.Vector3(0, frameOpts.hauteur / 2.0, 0);
      frameGroupe.position = pos; //nouvelleCloison.position.add(pos)
      let frame = frameGroupe.getChildMeshes()[0];
      let csgFrame = BABYLON.CSG.FromMesh(frame);

      let glassOpts = trouOpts;
      glassOpts.largeur *= 0.85;
      glassOpts.hauteur *= 0.85;
      glassOpts.positiotrousn = new BABYLON.Vector3(0, 0, 0);
      glassOpts.position.y += -(frameOpts.hauteur / 2); //(glassOpts.hauteur*0.075)
      glassOpts.materiau = glass;
      let glassGroupe = creerCloison(`trou_glass_${nom}_${i}`, glassOpts, scn);
      glassGroupe.position = frame.position.add(glassOpts.position);
      glassGroupe.parent = frameGroupe;
      let glassMesh = glassGroupe.getChildMeshes()[0];
      let csgGlass = BABYLON.CSG.FromMesh(glassMesh);

      csgFrame = csgFrame.subtract(csgGlass);
      //glassMesh.dispose()

      const nouvelleFrame = csgFrame.toMesh(
        `frame_bois_${nom}_${i}`,
        frame.material,
        scn,
      );
      nouvelleFrame.checkCollisions = true;
      nouvelleFrame.parent = frameGroupe;
      frame.dispose();
    }
  }

  cloison.dispose();

  return groupe;
}

function creerPorte(nom, opts, scn) {
  let options = opts || {};
  let hauteur = options.hauteur || 4.0;
  let largeur = options.largeur || 2.0;
  let epaisseur = options.epaisseur || 0.1;

  let materiau =
    options.materiau || new BABYLON.StandardMaterial("materiau-" + nom, scn);

  let groupe = new BABYLON.TransformNode("groupe-" + nom, scn);

  for (let i = 0; i < 2; i++) {
    let battant = BABYLON.MeshBuilder.CreateBox(
      nom + "-battant-" + i,
      { width: largeur / 2, height: hauteur, depth: epaisseur },
      scn,
    );
    battant.material = materiau;
    battant.parent = groupe;
    battant.position.x = ((i == 0 ? -1 : 1) * largeur) / 4;
    battant.position.y = hauteur / 2;
    battant.checkCollisions = true;
  }

  let ouverte = false;
  const distanceOuverture = 3;

  const battants = groupe.getChildMeshes().map((b) => {
    const s = b.position.x < 0 ? -1 : 1;
    return { b, ferme: s * largeur / 4, ouvert: s * largeur / 4 + s * largeur / 2 };
  });

  scn.onBeforeRenderObservable.add(() => {
    const camera = scn.activeCamera;
    if (!camera) return;

    const p = groupe.getAbsolutePosition();
    const dx = camera.position.x - p.x;
    const dz = camera.position.z - p.z;
    const proche = Math.sqrt(dx * dx + dz * dz) < distanceOuverture;

    if (proche == ouverte) return;
    ouverte = proche;

    battants.forEach(({ b, ferme, ouvert }) => {
      scn.stopAnimation(b);
      BABYLON.Animation.CreateAndStartAnimation(
        "slide", b, "position.x", 60, 30,
        b.position.x, ouverte ? ouvert : ferme,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );
    });
  });


  return groupe;
}

// function to impor a .glb file
function creerModel3D(nom, opts, scn) {
  opts = opts || {};
  const filename = opts.fichier || "";
  const hauteurCible = opts.hauteur || 2.0; // final height in scene units

  const container = new BABYLON.TransformNode("model-container-" + nom, scn);

  BABYLON.SceneLoader.ImportMesh(
    null,
    "",
    filename,
    scn,
    function (meshes) {
      meshes.forEach((mesh) => {
        if (!mesh.parent) mesh.parent = container;
        if (mesh.material) mesh.material.maxSimultaneousLights = 12;
      });

      // Measure the model at scale 1
      container.computeWorldMatrix(true);
      const { min, max } = container.getHierarchyBoundingVectors(true);
      const taille = max.subtract(min);
      console.log(nom, "- meshes:", meshes.length, "- taille brute:", taille);

      // Scale so its height = hauteurCible
      const s = hauteurCible / taille.y;
      container.scaling = new BABYLON.Vector3(s, s, s);

      // Put its base on the ground (y = 0 in the container)
      meshes.forEach((mesh) => {
        if (mesh.parent === container) {
          mesh.position.y -= min.y;
        }
      });
    },
    null,
    function (scene, message, exception) {
      console.error("Erreur de chargement du modèle 3D :", message, exception);
    },
  );

  return container;
}

function creerEtoile(nom, opts, scn) {
  let options = opts || {};
  let largeur = options.largeur || 0.2;
  let hauteur = options.hauteur || 2.0;
  let profondeur = options.profondeur || 0.2;
  let materiau = options.materiau || null;

  if (materiau == null) {
    materiau = new BABYLON.StandardMaterial("mat_" + nom, scn);
    materiau.diffuseColor = new BABYLON.Color3(1.0, 1.0, 0.8); // dorado claro
    materiau.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  }

  const base = new BABYLON.TransformNode(nom, scn);

  // Primer cubo
  const box1 = BABYLON.MeshBuilder.CreateBox(
    nom + "_1",
    {
      width: largeur,
      height: hauteur,
      depth: profondeur,
    },
    scn,
  );
  box1.material = materiau;
  box1.parent = base;

  // Segundo cubo
  const box2 = BABYLON.MeshBuilder.CreateBox(
    nom + "_2",
    {
      width: largeur,
      height: hauteur,
      depth: profondeur,
    },
    scn,
  );
  box2.material = materiau;
  box2.rotation.y = Math.PI / 4;
  box2.parent = base;

  // Tercer cubo
  const box3 = BABYLON.MeshBuilder.CreateBox(
    nom + "_3",
    {
      width: largeur,
      height: hauteur,
      depth: profondeur,
    },
    scn,
  );
  box3.material = materiau;
  box3.rotation.x = Math.PI / 4;
  box3.parent = base;

  // Cuarto cubo
  const box4 = BABYLON.MeshBuilder.CreateBox(
    nom + "_4",
    {
      width: largeur,
      height: hauteur,
      depth: profondeur,
    },
    scn,
  );
  box4.material = materiau;
  box4.rotation.z = Math.PI / 4;
  box4.parent = base;

  return base;
}

function creerPlafond(nom, opts, scn) {
  let options = opts || {};
  let profondeur = options.profondeur || 3.0;
  let largeur = options.largeur || 5.0;
  let epaisseur = options.epaisseur || 0.1;

  let materiau =
    options.materiau || new BABYLON.StandardMaterial("materiau-pos" + nom, scn);

  let groupe = new BABYLON.TransformNode("groupe-" + nom);

  let plafond = BABYLON.MeshBuilder.CreateBox(
    nom,
    { width: profondeur, height: largeur, depth: epaisseur },
    scn,
  );
  plafond.material = materiau;
  plafond.parent = groupe;
  // plafond.position.y = profondeur / 2.0 ;
  plafond.rotation.x = Math.PI / 2.0;

  plafond.checkCollisions = true;

  return groupe;
}

function creerEscalier(nom, opts, scn) {
  let options = opts || {};
  let nbMarches = options.nbMarches || 10;
  let largeur = options.largeur || 2.0;
  let hauteurMarche = options.hauteurMarche || 0.2;
  let profondeurMarche = options.profondeurMarche || 0.3;

  let materiau =
    options.materiau ||
    new BABYLON.StandardMaterial("materiau-esc-" + nom, scn);

  let groupe = new BABYLON.TransformNode("groupe-" + nom, scn);

  for (let i = 0; i < nbMarches; i++) {
    let h = hauteurMarche * (i + 1);

    let marche = BABYLON.MeshBuilder.CreateBox(
      nom + "-marche-" + i,
      { width: largeur, height: h, depth: profondeurMarche },
      scn,
    );

    marche.material = materiau;
    marche.parent = groupe;
    marche.position.y = h / 2.0;
    marche.position.z = profondeurMarche * i + profondeurMarche / 2.0;

    marche.checkCollisions = true;
  }

  return groupe;
}

const PRIMS = {
  camera: creerCamera,
  reticule: creerReticule,
  wall: creerCloison,
  sphere: creerSphere,
  box: creerBoite,
  poster: creerPoster,
  standardMaterial: creerMateriauStandard,
  meadow: creerPrairie,
  ground: creerSol,
  sky: creerCiel,
  creuser: creuser,
  person: creerPersonne,
  wallHole: wallWithHole, //creerCloisonAvecTrous,//creerCloisonEtTrou
  door: creerPorte,
  model: creerModel3D,
  star: creerEtoile,
  roof: creerPlafond,
  stairs: creerEscalier,
  sign: creerPanneau,
  bench: creerBanc,
  pendant: creerSuspension,
  ceilingLight: creerPlafonnier,
  registerArtwork: enregistrerOeuvre,
};

export { PRIMS };
