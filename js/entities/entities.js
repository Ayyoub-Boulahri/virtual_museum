
//import {COMPS} from '../composants/components.js' ; 

function removeArrayElement(array, element) {
    const ndx = array.indexOf(element);
    if (ndx >= 0) {
        array.splice(ndx, 1);
    }
}


class Entity {
    constructor(name, data, sim) {
        this.name       = name;
        this.components = []; 
        this.sim        = sim ;  
        this.object3d   = null ; 
        this.focus      = false ; 
        this.position   = new BABYLON.Vector3(0.0,0.0,0.0) ; 
        this.rotation   = new BABYLON.Vector3(0.0,0.0,0.0) ; 
        this.direction  = new BABYLON.Vector3(0.0,0.0,-1.0) ;
    }
    
    addComponent(component) {
        //this.components.push(component);
        return this;
    }
    
    add(ComponentType, data) {
        const component = new ComponentType(data, this);
        // this.components.push(component);
        return this;
    }
    
    removeComponent(component) {
        removeArrayElement(this.components, component);
    }
    

    getComponent(ComponentType) {
        return this.components.find(c => c instanceof ComponentType);
    }
    
    executeComponents(t) {
        //console.log("Exécution des composants de : ", this.name);
        //console.log(this.components) ; 
        this.components.forEach((c)=>{c.execute(t);})
    }
    
    update(dt){}

    dispose(){
        if(this.object3d){
            this.object3d.dispose() ; 
        }
    }
}

class Kine extends Entity {

	constructor(name, data, sim){
		super(name, data, sim) ; 
		this.velocity     = new BABYLON.Vector3(0,0,0) ; 
		this.acceleration = new BABYLON.Vector3(0,0,0) ; 
	}
	
	update(dt){
		this.velocity.scaleAndAddToRef(dt,this.position) ; 
		this.acceleration.scaleAndAddToRef(dt, this.velocity) ; 
		
		
		if(this.object3d){
			this.object3d.position.copyFrom(this.position) ; 
		}

	}
}

class Newton extends Entity {

	constructor(name, data, sim){
		super(name, data, sim);
		this.mass     = data.mass || 1.0 ; 
		this.velocity = new BABYLON.Vector3(0,0,0) ; 
		this.force    = new BABYLON.Vector3(0,0,0) ; 
	}

	applyForce(f){
		this.force.addInPlace(f) ; 
	}

	update(dt){
	
		//console.log("=> ", this.name, " : ", this.force) ; 
		//console.log("Acteur : ", this.sim.clock);
		this.velocity.scaleAndAddToRef(dt,this.position) ; 
		this.force.scaleAndAddToRef(dt/this.mass, this.velocity) ; 
		this.force.set(0,0,0) ; 

		if(this.object3d){
			this.object3d.position.copyFrom(this.position) ; 
		}

	}
}


// Juste pour l exercice

// Pendulum: rod of length l with a cylindrical mass of radius r at the bottom,
// oscillating with period T. Geometry in the constructor, motion in update.
class Pendule extends Entity {
    constructor(name, data, sim){
        super(name, data, sim);
        const scn = sim.scene;

        this.l = data.l ?? data.longueur ?? 3.0;
        this.r = data.r ?? data.rayon    ?? 0.5;
        this.T = data.T ?? data.periode  ?? 2.0;
        this.amplitude = data.amplitude ?? (Math.PI / 4);
        this.t = 0.0;

        this.position.set(data.x || 0.0, data.y || 0.0, data.z || 0.0);

        const matTige = data.materiauTige || new BABYLON.StandardMaterial("mat-tige-" + name, scn);
        if (!data.materiauTige) matTige.diffuseColor = new BABYLON.Color3(0.15, 0.15, 0.15);

        const matMasse = data.materiauMasse || new BABYLON.StandardMaterial("mat-masse-" + name, scn);
        if (!data.materiauMasse) matMasse.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);

        // The group sits at the suspension point: it's what pivots.
        const groupe = new BABYLON.TransformNode("pendule-" + name, scn);
        if (data.parent !== undefined) groupe.parent = data.parent;
        groupe.position.copyFrom(this.position);

        // Lets you orient the whole pendulum in space
        if (data.rotY !== undefined) groupe.rotation.y = data.rotY;
        if (data.rotX !== undefined) groupe.rotation.x = data.rotX;

        const epaisseurTige = data.epaisseurTige || (this.r * 0.25);
        const tige = BABYLON.MeshBuilder.CreateCylinder("tige-" + name,
            { height: this.l, diameter: epaisseurTige }, scn);
        tige.material = matTige;
        tige.parent = groupe;
        tige.position.y = -this.l / 2.0;

        // Cylindrical mass with a horizontal axis (// Z): rotate the cylinder 90° on X.
        const epaisseurMasse = data.epaisseurMasse || this.r;
        const masse = BABYLON.MeshBuilder.CreateCylinder("masse-" + name,
            { height: epaisseurMasse, diameter: 2.0 * this.r }, scn);
        masse.material = matMasse;
        masse.parent = groupe;
        masse.position.y = -this.l;
        masse.rotation.x = Math.PI / 2.0;

        this.object3d = groupe;
    }

    update(dt){
        // Harmonic oscillation of period T about Z
        // Au + : 3 lignes de code
        this.t += dt;
        const theta = this.amplitude * Math.sin(2.0 * Math.PI * this.t / this.T);
        this.object3d.rotation.z = theta;
    }
}


// Black and gold column clock, in the museum's colours: a slim lacquered
// column with a round black dial on top and a gilded pendulum in front.
// Virtual time (seconds since midnight) advances by dt, i.e. at the same
// speed as physical time. Starts at data.heure/minute/seconde if given,
// otherwise at the current real time.
// Local frame: origin on the floor, dial facing -Z, back of the column at z = 0.4
// (put that side against a wall).
class Horloge extends Entity {
    constructor(name, data, sim){
        super(name, data, sim);
        const scn = sim.scene;

        this.position.set(data.x || 0.0, data.y || 0.0, data.z || 0.0);
        if (data.heure !== undefined) {
            this.temps = 3600 * data.heure + 60 * (data.minute || 0) + (data.seconde || 0);
        } else {
            const d = new Date();
            this.temps = 3600 * d.getHours() + 60 * d.getMinutes() + d.getSeconds()
                       + d.getMilliseconds() / 1000.0;
        }

        const groupe = new BABYLON.TransformNode("horloge-" + name, scn);
        if (data.parent !== undefined) groupe.parent = data.parent;
        groupe.position.copyFrom(this.position);
        if (data.rotY !== undefined) groupe.rotation.y = data.rotY;
        this.object3d = groupe;

        // Same black and gold as the statue's plinth
        const matNoir = new BABYLON.PBRMaterial("mat-noir-" + name, scn);
        matNoir.albedoColor = new BABYLON.Color3(0.045, 0.04, 0.035);
        matNoir.metallic = 0.35;
        matNoir.roughness = 0.25;
        matNoir.usePhysicalLightFalloff = false;

        const matOr = new BABYLON.PBRMaterial("mat-or-" + name, scn);
        matOr.albedoColor = new BABYLON.Color3(0.8, 0.58, 0.24);
        matOr.metallic = 0.95;
        matOr.roughness = 0.3;
        matOr.usePhysicalLightFalloff = false;

        matNoir.maxSimultaneousLights = matOr.maxSimultaneousLights = 10;

        const boite = (nom, w, h, d, x, y, z, materiau) => {
            const b = BABYLON.MeshBuilder.CreateBox(nom + "-" + name,
                { width: w, height: h, depth: d }, scn);
            b.material = materiau;
            b.parent = groupe;
            b.position.set(x, y, z);
            return b;
        };

        // Base and column
        boite("socle",   0.6,  0.12, 0.4,  0, 0.06, 0.2,   matNoir);
        boite("bandeau", 0.62, 0.02, 0.42, 0, 0.13, 0.2,   matOr);
        boite("colonne", 0.3,  2.0,  0.2,  0, 1.14, 0.3,   matNoir);
        boite("filet",   0.02, 1.5,  0.01, 0, 0.95, 0.195, matOr);

        // Dial: black disc with its axis along Z and a gold rim
        const R = 0.3, yCadran = 2.2;
        const cadran = BABYLON.MeshBuilder.CreateCylinder("cadran-" + name,
            { height: 0.04, diameter: 2.0 * R, tessellation: 48 }, scn);
        cadran.material = matNoir;
        cadran.parent = groupe;
        cadran.rotation.x = Math.PI / 2.0;
        cadran.position.set(0, yCadran, 0.18);

        const lunette = BABYLON.MeshBuilder.CreateTorus("lunette-" + name,
            { diameter: 2.0 * R, thickness: 0.03, tessellation: 48 }, scn);
        lunette.material = matOr;
        lunette.parent = groupe;
        lunette.rotation.x = Math.PI / 2.0;
        lunette.position.set(0, yCadran, 0.16);

        // Hour markers (the one at 12 is longer)
        for (let i = 0; i < 12; i++) {
            const a = i * Math.PI / 6.0;
            const lg = (i === 0) ? 0.07 : 0.04;
            const repere = boite("repere-" + i, 0.015, lg, 0.005, 0, 0, 0.157, matOr);
            const d = R - 0.04 - lg / 2.0;
            repere.position.set(d * Math.sin(a), yCadran + d * Math.cos(a), 0.157);
            repere.rotation.z = -a;
        }

        // A hand is a thin box hanging off a pivot node; rotating the pivot turns the hand.
        const aiguille = (nom, longueur, largeurA, z) => {
            const pivot = new BABYLON.TransformNode(nom + "-" + name, scn);
            pivot.parent = groupe;
            pivot.position.set(0, yCadran, z);
            const tige = boite("tige-" + nom, largeurA, longueur, 0.004, 0, longueur / 2.0, 0, matOr);
            tige.parent = pivot;
            return pivot;
        };
        this.aiguilleHeures   = aiguille("aiguille-heures",   0.15, 0.02,  0.152);
        this.aiguilleMinutes  = aiguille("aiguille-minutes",  0.22, 0.012, 0.147);
        this.aiguilleSecondes = aiguille("aiguille-secondes", 0.24, 0.004, 0.142);

        // Seconds pendulum in front of the column: T = 2 s, so each swing lasts one second.
        this.pendule = new Pendule(name + "-pendule", {
            parent: groupe,
            y: yCadran - R - 0.05, z: 0.17,
            l: 1.2, r: 0.08, T: 2.0,
            amplitude: 0.1,
            epaisseurTige: 0.01,
            epaisseurMasse: 0.02,
            materiauTige: matOr,
            materiauMasse: matOr
        }, sim);
        // in phase with the time: the bob passes the middle when the seconds hand ticks
        this.pendule.t = this.temps % this.pendule.T;

        // Invisible block so the camera can't walk through the clock
        const collision = boite("collision", 0.62, 2.55, 0.3, 0, 1.275, 0.25, null);
        collision.isVisible = false;
        collision.isPickable = false;
        collision.checkCollisions = true;

        this.afficherHeure();
    }

    // Babylon is left-handed: a negative rotation about Z turns clockwise
    // for a viewer facing the dial.
    afficherHeure(){
        const s = this.temps % 60.0;
        const m = (this.temps / 60.0) % 60.0;
        const h = (this.temps / 3600.0) % 12.0;
        this.aiguilleSecondes.rotation.z = -2.0 * Math.PI * Math.floor(s) / 60.0;
        this.aiguilleMinutes.rotation.z  = -2.0 * Math.PI * m / 60.0;
        this.aiguilleHeures.rotation.z   = -2.0 * Math.PI * h / 12.0;
    }

    update(dt){
        this.temps = (this.temps + dt) % 86400.0;
        this.pendule.update(dt);
        this.afficherHeure();
    }
}








const ENTITIES = {
        pendule : Pendule,
        horloge : Horloge,
        newton : Newton,
        kine   : Kine,
        entity : Entity
}

export {ENTITIES};

