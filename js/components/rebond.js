
import {Component} from './component.js' ; 


class Rebond extends Component {
    constructor(data, entity) {
		super(data, entity) ;  
        this.register(0.1) ; 
        this.xmin = data.xmin || -10;
        this.xmax = data.xmax || -5;
        this.ymin = data.ymin || 5.4;
        this.ymax = data.ymax || 9.5;
        this.zmin = data.zmin || 0;
        this.zmax = data.zmax || 5;
		this.speed = data.speed   || 2; 

	}
	
	execute(t){

 
        // A calculer : vx, vy et vz pour rendre effectifs les déplacements avec rebonds
        const vx = 0.0 ; 
        const vy = 0.0 ; 
        const vz = 0.0 ; 
        this.entity.velocity.copyFromFloats(vx,vy,vz) ;

	}
}

export {Rebond};
