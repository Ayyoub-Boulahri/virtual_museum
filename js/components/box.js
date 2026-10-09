import {PRIMS} from '../prims.js'; 
import {Component} from './component.js'; 

class Box extends Component {

    constructor(data, entity) {
        super(data, entity);

        const l = data.width  || data.largeur    || 1.0;
        const h = data.height || data.hauteur    || 1.0;
        const e = data.depth  || data.profondeur || 1.0;

        const material = data.material || data.materiau || "gris";
        const m = entity.sim.findAsset(material);

        const box = PRIMS.box(
            data.name || entity.name,
            {
                width: l,
                height: h,
                depth: e,
                materiau: m,
                material: m
            },
            this.entity.sim.scene
        );

        this.entity.object3d = box;
    }
}

export {Box};