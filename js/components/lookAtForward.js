import {Component} from './component.js';

class LookAtForward extends Component {

    constructor(data, entity){
        super(data, entity);
        this.cibleEntity = entity.sim.getEntity(data.cible || "");
        this.register();
    }

    execute(t){

        if(!this.entity.object3d) return;

        if(this.cibleEntity){
            const p = this.cibleEntity.position;
            this.entity.object3d.lookAt(new BABYLON.Vector3(p.x, this.entity.object3d.position.y, p.z));
            return;
        }

        const v = this.entity.velocity;

        if(!v) return;

        const speed = Math.sqrt(
            v.x*v.x +
            v.z*v.z
        );

        if(speed < 0.01) return;

        const pos = this.entity.object3d.position;
        const cible = new BABYLON.Vector3(pos.x + v.x, pos.y, pos.z + v.z);

        this.entity.object3d.lookAt(cible);

    }
}

export {LookAtForward}