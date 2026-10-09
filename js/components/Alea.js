
import {Component} from './component.js' ; 


class Alea extends Component {
    constructor(data, actor){
    this.deltaAngle = data.deltaAngle || 0.1 ;
    this.deltaIntensity = data.deltaIntensity || 0.1 ;
    this.angle = 0.0 ;
    this.intensity = 0.0 ;
    this.force = new BABYLON.Vector3(0,0,0) ;
    this.register() ;
    }
    execute(t){
    this.angle += (0.5-Math.random())*this.deltaAngle ;
    this.intensity += (0.5-Math.random())*deltaIntensity ;
    if(this.intensity < 0)
    this.intensity = 0 ;
    this.force.set(this.intensity*Math.cos(this.angle),
    0,
    this.intensity*Math.sin(this.angle));
    this.entity.applyForce(this.force) ;
    }
    }

export {Alea};
