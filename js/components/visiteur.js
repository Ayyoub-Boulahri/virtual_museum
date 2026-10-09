import {Component} from './component.js';
import {creerPersonnage, materiau} from './personnage.js';

const alea  = (min, max) => min + Math.random() * (max - min);
const choix = (liste) => liste[Math.floor(Math.random() * liste.length)];

const HAUTS   = ["#7a2430", "#b8892f", "#2f4a3a", "#c9b79c", "#5a5f66", "#2e3d5c", "#8c5a3c"];
const BAS     = ["#2b2b2b", "#3d3326", "#4a4a52", "#1f2a3a"];
const PEAUX   = ["#f1c9a5", "#e0ac83", "#c68a5e", "#8d5a3b", "#5c3a26"];
const CHEVEUX = ["#1a1410", "#3b2416", "#7a4b23", "#c9a25a", "#8a8a8a"];

class Visiteur extends Component {

    constructor(data, entity){
        super(data, entity);
        const scn = entity.sim.scene;

        const hauteur = data.hauteur ?? alea(1.55, 1.9);
        const p = creerPersonnage(entity.name, {
            hauteur,
            largeur:   data.largeur   ?? alea(0.42, 0.56),
            epaisseur: data.epaisseur ?? alea(0.24, 0.32),
            tete:      data.tete      ?? 0.15 * hauteur,
            yeux:      data.yeux,
            couleurs: Object.assign({
                haut: choix(HAUTS), bas: choix(BAS), peau: choix(PEAUX), cheveux: choix(CHEVEUX)
            }, data.couleurs)
        }, scn);

        if (data.chapeau ?? Math.random() < 0.5) {
            const y = p.H + 0.04 * p.T;
            const cylindre = (partie, diametre, hauteurC, yC, couleur) => {
                const c = BABYLON.MeshBuilder.CreateCylinder(entity.name + "-" + partie,
                    { diameter: diametre, height: hauteurC, tessellation: 24 }, scn);
                c.material = materiau(couleur, scn);
                c.parent = p.groupe;
                c.position.y = yC;
            };
            cylindre("bord",   1.6 * p.T,  0.04 * p.T, y,              "#d9c38a");
            cylindre("calotte", 1.05 * p.T, 0.3 * p.T,  y + 0.15 * p.T, "#d9c38a");
            cylindre("ruban",  1.07 * p.T, 0.08 * p.T, y + 0.07 * p.T, "#1a1a1a");
        }

        this.entity.object3d = p.groupe;
    }
}

export {Visiteur};
