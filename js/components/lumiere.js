import { Component } from './component.js';
import { PRIMS } from '../prims.js';

class Lumiere extends Component {

    constructor(data, entity) {
        super(data, entity);

        const position = new BABYLON.Vector3(
            data.position?.x || 0,
            data.position?.y || 5,
            data.position?.z || 0
        );

        const direction = new BABYLON.Vector3(
            data.direction?.x || 0,
            data.direction?.y || -1,
            data.direction?.z || 1
        );

        const intensite = data.intensity || 1.0;

        const couleur = data.color
            ? new BABYLON.Color3(data.color.r, data.color.g, data.color.b)
            : new BABYLON.Color3(1.0, 0.75, 0.5);

        const angle = data.angle || Math.PI / 4; // 45°
        const exponent = data.exponent || 2;
        const portee = data.range || 20;

        const opts = {
            position: position,
            direction: direction,
            intensite: intensite,
            couleur: couleur,
            angle: angle,
            exponent: exponent,
            portee: portee
        };

        const lumiere = PRIMS.lumiere(data.name, opts, this.entity.sim.scene);
        this.entity.object3d = lumiere;
    }
}

export { Lumiere };
