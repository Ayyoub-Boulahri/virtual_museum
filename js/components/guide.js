import {Component} from './component.js';
import {creerPersonnage, materiau} from './personnage.js';

class Guide extends Component {

    constructor(data, entity){
        super(data, entity);
        const scn = entity.sim.scene;

        const p = creerPersonnage(entity.name, Object.assign({ hauteur: 1.85 }, data, {
            couleurs: Object.assign(
                { haut: "#1d2433", bas: "#14181f", cheveux: "#1a1410" }, data.couleurs)
        }), scn);
        const or = "#c99a3d";

        // Buttons down the jacket and a badge on the chest
        const zDevant = p.E / 2;
        for (let i = 0; i < 4; i++) {
            p.boite("bouton" + i, 0.06 * p.L, 0.06 * p.L, 0.02,
                    0, p.hJambes + (0.2 + 0.2 * i) * p.hTronc, zDevant, or);
        }
        p.boite("badge", 0.22 * p.L, 0.08 * p.L, 0.02, -0.25 * p.L, p.hJambes + 0.8 * p.hTronc, zDevant, or);

        // Peaked cap sitting on the hair
        const yCasquette = p.H + 0.04 * p.T;
        const cylindre = (partie, diametre, hauteur, y, couleur) => {
            const c = BABYLON.MeshBuilder.CreateCylinder(entity.name + "-" + partie,
                { diameter: diametre, height: hauteur, tessellation: 24 }, scn);
            c.material = materiau(couleur, scn);
            c.parent = p.groupe;
            c.position.y = y;
        };
        cylindre("casquette", 1.1 * p.T,  0.25 * p.T, yCasquette + 0.125 * p.T, p.couleurs.haut);
        cylindre("galon",     1.12 * p.T, 0.06 * p.T, yCasquette + 0.03 * p.T,  or);
        p.boite("visiere", 0.8 * p.T, 0.03 * p.T, 0.35 * p.T, 0, yCasquette, 0.6 * p.T, "#0d0f14");

        this.entity.object3d = p.groupe;
    }
}

export {Guide};
