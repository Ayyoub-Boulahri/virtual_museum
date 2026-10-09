
import {Component} from './component.js' ; 


class Vent extends Component {
    constructor(data, entity){
        super(data,entity)
        this.deltaAngle = data.deltaAngle || 0.5 ;
        this.deltaIntensity = data.deltaIntensity || 5;
        this.angle = 0.0 ;
        this.intensity = 0.0 ;
        this.force = new BABYLON.Vector3(0,0,0) ;
        this.wait=0;
        this.direction=new BABYLON.Vector3();
        this.anglelimit=Math.PI*2
        this.register() ;
        }
    execute(t){
        if(this.wait==50){
            this.wait=0;
            this.angle += (Math.random()*(-this.deltaAngle-this.deltaAngle)+this.deltaAngle); 
            if(this.angle>this.anglelimit){
                this.angle-=this.anglelimit;
            }
            // Calcul du vecteur de direction basé sur l'angle
            this.direction.set(Math.cos(this.angle), 0, Math.sin(this.angle));
            this.entity.object3d.lookAt(this.entity.position.add(this.direction));
            this.intensity += (0.5-Math.random())*this.deltaIntensity ;
            if(this.intensity < 0)
                this.intensity = 0 ;
                this.force.set(this.intensity*Math.cos(this.angle),
                0,
                this.intensity*Math.sin(this.angle));
                this.entity.applyForce(this.force) ;
        }
        else{
            this.wait+=1;
        }
    }
    }

export {Vent};
