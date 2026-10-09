import {createPointerLock} from './pointerLock.js' ; 
import {PRIMS}             from './prims.js' ; 

class Visu {

	constructor(){

    		this.canvas = document.getElementById("renderCanvas") ; 
    		this.engine = new BABYLON.Engine(this.canvas, true) ; 
    		this.clock  = 0.0 ; 

    		this.scene  = new BABYLON.Scene() ; 
    		this.scene.useRightHandedSystem=true;
    		this.scene.gravity = new BABYLON.Vector3(0,-0.5,0) ; 
    		createPointerLock(this.scene) ; 
    
    		this.camera = PRIMS.camera("camera",{}, this.scene) ;  
    		this.camera.attachControl(this.canvas, false) ;

    		this.reticule = PRIMS.reticule("reticule",{},this.scene);
    		this.reticule.parent = this.camera;
      

		
    		
    		this.assets = {} ; 
    
    		const that = this ;
    		window.addEventListener("resize", ()=>{that.engine.resize();})   
	}

	go(){
    		const that = this ; 
    		this.engine.runRenderLoop(function(){
        		const dt = that.engine.getDeltaTime()/1000.0 ; 
        		that.clock += dt ; 
        		that.update(dt) ; 
				that.teleport();
        		that.scene.render() ; 
    		});
	}

	createWorld(data){}
	
	update(dt){}

	teleport(){
		var pos = this.camera.position;
		// console.log(this.camera.position);
	
		// Vérification de la position x et z
		if (pos.x > 0 && pos.x < 1 && pos.z > -0.5 && pos.z < 0.5) {
			// Réglage de la caméra dans la position initiale
			this.camera.position.x = -2;
			this.camera.position.z = 0;
			this.camera.position.y = 7.1;
		}
	
		// Vérification de la condition pour descendre
		if (pos.y > 4 && pos.x > -1 && pos.x < 0 && pos.z > -0.5 && pos.z < 0.5) {
			// Ajustement pour la descente
			this.camera.position.x = 1;
			this.camera.position.y = 2; 
			this.camera.position.z = -5;
		}
	}
	
	registerAsset(name, foo, data){
        console.log("registerAsset : ", name," ",foo," ", data) ; 
		this.assets[name] = foo(name, data, this.scene);
	}
	
	removeAsset(name){}
	
	findAsset(name){return this.assets[name] || null;}
}

export {Visu} ; 
