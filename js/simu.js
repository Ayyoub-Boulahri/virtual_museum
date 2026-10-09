
import {PRIMS}     from './prims.js' ; 
import {Visu}      from './visu.js' ;
import {SafeArray} from './safeArray.js' ;  

class Simu extends Visu {

	constructor(){
		super() ; 
		this.directory = {} ; 
		this.entities = new SafeArray() ; 
	}



	createWorld(data) {} // Méthode abstraite
	
	createEntity(name, Type, data){
		const entity = new Type(name, data, this) ;
		this.directory[name] = entity ;  
		this.entities.add(entity) ; 
		return entity ; 
	}
	
	removeEntity(entity){
		delete this.directory[name] ; 
		this.entities.remove(entity) ; 
	}
	
	getEntity(name){return this.directory[name] || null ; }

    update(dt){
    	this.entities.forEach((e) => {e.executeComponents(this.clock);}) ; 
        this.entities.forEach((e) => {e.update(dt)}) ; 
    }
}

export {Simu}