
import {Component}      from  './component.js' ; 

import {Sphere}         from  './sphere.js' ; 
import {Box}            from  './box.js' ; 
import {Sky}            from  './sky.js' ; 
import {Ground}         from  './ground.js' ; 
import {Wall}           from  './wall.js' ; 
import {Poster}         from  './poster.js' ; 
import {Model}          from "./model.js";

import {Position}       from  './position.js' ; 
import {Rotation}       from  './rotation.js' ; 
import {AnchoredTo}     from  './anchoredTo.js' ; 

import {LookAtPoint}    from  './lookAtPoint.js' ;
import {LookAtCamera}   from './lookAtCamera.js' ; 
import {LookAtForward} from './lookAtForward.js';

import {BrownianMotion} from './brownianMotion.js' ;  



import {Vent}           from  './vent.js' ; 
import {Alea}           from  './Alea.js' ; 
import {Rebond}         from  './rebond.js' ;


import {Lumiere}        from  './lumiere.js' ; 





const COMPS = {
    box            : Box,
    sphere         : Sphere,
    wall           : Wall,
    sky            : Sky,
    ground         : Ground,
    poster         : Poster,
    model          : Model,
    position       : Position,
    rotation       : Rotation,
    anchoredTo     : AnchoredTo,
    lookAtPoint    : LookAtPoint,
    lookAtCamera   : LookAtCamera,
    brownianMotion : BrownianMotion,
    vent           : Vent,
    alea           : Alea,
    rebond         : Rebond,
    //appear         : Appear,
    lumiere        : Lumiere,

    lookAtForward  : LookAtForward,

    component      : Component
    
}

export {COMPS} ; 
