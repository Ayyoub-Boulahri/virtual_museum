const materiaux = new Map();
function materiau(couleur, scn) {
    if (!materiaux.has(couleur)) {
        const m = new BABYLON.StandardMaterial("mat-perso-" + couleur, scn);
        m.diffuseColor = BABYLON.Color3.FromHexString(couleur);
        m.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
        m.maxSimultaneousLights = 10;
        materiaux.set(couleur, m);
    }
    return materiaux.get(couleur);
}

function creerPersonnage(nom, opts, scn) {
    const H = opts.hauteur   ?? 1.75;
    const L = opts.largeur   ?? 0.5;
    const E = opts.epaisseur ?? 0.28;
    const T = opts.tete      ?? 0.26;
    const D = opts.yeux      ?? 0.06;
    const c = Object.assign(
        { peau: "#e8b896", haut: "#555555", bas: "#2b2b2b", cheveux: "#3b2416" },
        opts.couleurs);

    const groupe = new BABYLON.TransformNode("personnage-" + nom, scn);

    const boite = (partie, w, h, d, x, y, z, couleur) => {
        const b = BABYLON.MeshBuilder.CreateBox(nom + "-" + partie,
            { width: w, height: h, depth: d }, scn);
        b.material = materiau(couleur, scn);
        b.parent = groupe;
        b.position.set(x, y, z);
        return b;
    };
    const sphere = (partie, diametre, x, y, z, couleur) => {
        const s = BABYLON.MeshBuilder.CreateSphere(nom + "-" + partie,
            { diameter: diametre, segments: 8 }, scn);
        s.material = materiau(couleur, scn);
        s.parent = groupe;
        s.position.set(x, y, z);
        return s;
    };

    // Below the head: legs, then the torso with an arm on each side
    const hCorps  = H - T;
    const hJambes = 0.48 * hCorps;
    const hTronc  = hCorps - hJambes;
    const lJambe  = 0.42 * L;
    const hBras   = 0.9 * hTronc;
    [-1, 1].forEach((s) => {
        boite("jambe" + s, lJambe, hJambes, 0.8 * E, s * (L - lJambe) / 2, hJambes / 2, 0, c.bas);
        boite("bras" + s, 0.2 * L, hBras, 0.7 * E, s * 0.6 * L, hCorps - hBras / 2, 0, c.haut);
        boite("main" + s, 0.16 * L, 0.3 * T, 0.5 * E, s * 0.6 * L, hCorps - hBras - 0.15 * T, 0, c.peau);
    });
    const tronc = boite("tronc", L, hTronc, E, 0, hJambes + hTronc / 2, 0, c.haut);

    // Head with hair on the top and the back
    const tete = boite("tete", T, T, 0.9 * T, 0, hCorps + T / 2, 0, c.peau);
    boite("cheveux",     1.04 * T, 0.22 * T, 0.94 * T, 0, hCorps + 0.93 * T, 0,          c.cheveux);
    boite("cheveux-dos", 1.04 * T, 0.6 * T,  0.1 * T,  0, hCorps + 0.7 * T, -0.47 * T, c.cheveux);

    // Face, on the +Z side of the head
    const zFace = 0.45 * T;
    [-1, 1].forEach((s) => {
        sphere("oeil" + s,   D,       s * 0.22 * T, hCorps + 0.58 * T, zFace,            "#f4f4f0");
        sphere("pupille" + s, 0.5 * D, s * 0.22 * T, hCorps + 0.58 * T, zFace + 0.35 * D, "#111111");
    });
    boite("bouche", 0.3 * T, 0.04 * T, 0.02, 0, hCorps + 0.25 * T, zFace, "#8a3b30");

    tronc.checkCollisions = true;
    tete.checkCollisions = true;

    return { groupe, boite, H, L, E, T, hCorps, hJambes, hTronc, couleurs: c };
}

export { creerPersonnage, materiau };
