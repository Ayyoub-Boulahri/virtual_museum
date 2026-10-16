import {PRIMS} from '../prims.js';
import {Component} from './component.js';

// Plateforme de téléportation (voir PRIMS.teleportPad).
// Quand la caméra entre dans le disque, elle est déplacée vers la destination.
// data: destination {x, y, z} (y = niveau du sol d'arrivée), regard {x, z} (point visé à l'arrivée),
//       rayon, titre (texte du panneau), orientation (rotation du panneau)
class Teleporteur extends Component {

    constructor(data, entity){
        super(data, entity);
        this.register();
        this.rayon = data.rayon || 0.6;
        this.destination = data.destination;
        this.regard = data.regard || null;

        this.entity.object3d = PRIMS.teleportPad(entity.name, { rayon: this.rayon, titre: data.titre, orientation: data.orientation }, entity.sim.scene);
    }

    execute(t){
        const camera = this.entity.sim.camera;
        const c = camera.position;
        const p = this.entity.position;

        // délai partagé entre les téléporteurs pour éviter les allers-retours
        if (t < (Teleporteur.prochainDepart || 0)) return;

        const dx = c.x - p.x, dz = c.z - p.z;
        const auDessus = c.y > p.y && c.y < p.y + 3;
        if (!auDessus || dx * dx + dz * dz > this.rayon * this.rayon) return;

        const d = this.destination;
        camera.position.set(d.x, d.y + 1.8, d.z);
        if (this.regard) camera.setTarget(new BABYLON.Vector3(this.regard.x, d.y + 1.7, this.regard.z));
        Teleporteur.prochainDepart = t + 1.0;
    }
}

export {Teleporteur};
