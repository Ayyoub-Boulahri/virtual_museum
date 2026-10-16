
import {Component} from './component.js' ; 


class Rebond extends Component {
    constructor(data, entity) {
		super(data, entity) ;  
        this.register(0.1) ; 
        this.xmin = data.xmin ?? -10;
        this.xmax = data.xmax ?? -5;
        this.ymin = data.ymin ?? 5.4;
        this.ymax = data.ymax ?? 9.5;
        this.zmin = data.zmin ?? 0;
        this.zmax = data.zmax ?? 5;
		this.speed = data.speed   || 2; 
        // Or take the limits from another entity (e.g. a Vitrine) by name
        this.dans  = data.dans    || null;
        this.rayon = data.rayon   || 0;

	}
	
	execute(t){

        if (this.dans) {
            const conteneur = this.entity.sim.getEntity(this.dans);
            if (conteneur && conteneur.limites) Object.assign(this, conteneur.limites(this.rayon));
            this.dans = null;
        }

        const p = this.entity.position;
        let { x: vx, y: vy, z: vz } = this.entity.velocity;
        if(vx === 0 && vy === 0 && vz === 0) {
            const d = new BABYLON.Vector3(Math.random()- 0.5, Math.random() - 0.5, Math.random() - 0.5)
                                 .normalize().scale(this.speed);
            vx = d.x;
            vy = d.y;
            vz = d.z;
        }
        // ymin == ymax : déplacement dans le plan horizontal (personnages au sol)
        if (this.ymin === this.ymax) vy = 0;

        if ((p.x < this.xmin && vx < 0) || (p.x > this.xmax && vx > 0)) vx = -vx;
        if ((p.y < this.ymin && vy < 0) || (p.y > this.ymax && vy > 0)) vy = -vy;
        if ((p.z < this.zmin && vz < 0) || (p.z > this.zmax && vz > 0)) vz = -vz;

        this.entity.velocity.copyFromFloats(vx,vy,vz) ;

	}
}

export {Rebond};
