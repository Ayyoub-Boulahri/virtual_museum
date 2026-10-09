import {PRIMS} from '../prims.js'; 
import {Component} from './component.js'; 

class Guide extends Component {

    constructor(data, entity){
        super(data, entity);

        const d = data.dimension || 1.0;
        const material = data.material || "rouge";
        const m = entity.sim.findAsset(material);

        const guide = PRIMS.personne(
            entity.name,
            {
                dimension: 0.5,
                bodyColor: new BABYLON.Color3(0.45, 0.85, 1.0),
                headColor: new BABYLON.Color3(0.9, 0.9, 0.9)
            },
            entity.sim.scene
        );

        this.entity.object3d = guide;
    }
}

export {Guide};