import {Component} from './component.js';

class LookAtForward extends Component {

    constructor(data, entity){
        super(data, entity);
        this.register();
    }

    execute(t){

        const v = this.entity.velocity;

        if(!v) return;

        const speed = Math.sqrt(
            v.x*v.x +
            v.z*v.z
        );

        if(speed < 0.01) return;

        const pos = this.entity.position;

        // const cible = new BABYLON.Vector3( ... , ..., ....) ; // A compléter

    }
}

export {LookAtForward};
