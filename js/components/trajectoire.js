import {Component} from './component.js';

// Trajectoire par steering (Reynolds) : l'entité part de sa position (point 0) et passe par les N - 1 points.
// Réservé aux entités Newton : le composant applique une force (applyForce), Newton l'intègre.
//
// data: points [{x, y, z, pause, regard}, ...]
//              y facultatif ; pause : secondes d'arrêt sur ce point ; regard {x, z} : ce qu'on regarde pendant l'arrêt
//       vM     vitesse maximale
//       fM     force de steering maximale
//       boucle true : recommence au premier point, false : s'arrête sur le dernier (Arrive)
//       d0     rayon de la zone de freinage autour des points d'arrêt
//       rayon  distance à laquelle un point de passage est considéré comme atteint
//
// L'entité expose : direction (sens de marche, ou vers ce qu'elle regarde à l'arrêt) et regard (pendant un arrêt).
class Trajectoire extends Component {

    constructor(data, entity){
        super(data, entity);
        if (!entity.applyForce) throw new Error("Trajectoire : l'entité " + entity.name + " doit être une entité Newton");
        this.register();

        this.points = (data.points || []).map((p) => ({
            C: new BABYLON.Vector3(p.x, p.y ?? entity.position.y, p.z),
            pause: p.pause || 0,
            regard: p.regard || null,
        }));
        this.vM     = data.vM     || 1.0;
        this.fM     = data.fM     || 1.0;
        this.boucle = !!data.boucle;
        this.d0     = data.d0     || 1.5;
        this.rayon  = data.rayon  || 0.4;
        this.indice = 0;      // point visé
        this.finPause = null; // fin de l'arrêt en cours

        this.PC    = new BABYLON.Vector3(0, 0, 0);
        this.vd    = new BABYLON.Vector3(0, 0, 0);
        this.force = new BABYLON.Vector3(0, 0, 0);
        entity.regard = null;
    }

    dernier(){
        return !this.boucle && this.indice === this.points.length - 1;
    }

    execute(t){
        const e = this.entity;
        const point = this.points[this.indice];
        if (!point) return;
        const C = point.C;

        C.subtractToRef(e.position, this.PC);
        const d = this.PC.length();
        const arret = this.dernier() || point.pause > 0;

        // Arrêt en cours : on freine et on regarde l'œuvre, puis on repart
        if (this.finPause !== null) {
            e.applyForce(e.velocity.scale(-1));
            if (t < this.finPause) return;
            this.finPause = null;
            e.regard = null;
            this.indice = (this.indice + 1) % this.points.length;
            return;
        }

        if (d < this.rayon) {
            if (point.pause > 0) {
                this.finPause = t + point.pause;
                e.regard = point.regard;
                if (point.regard) {
                    const dx = point.regard.x - e.position.x, dz = point.regard.z - e.position.z;
                    const n = Math.sqrt(dx * dx + dz * dz) || 1;
                    e.direction.set(dx / n, 0, dz / n);
                    if (e.object3d) e.object3d.lookAt(new BABYLON.Vector3(point.regard.x, e.object3d.position.y, point.regard.z));
                }
                return;
            }
            if (!this.dernier()) {
                this.indice = (this.indice + 1) % this.points.length;
                return;
            }
        }

        // Seek : vd = vM * PC / |PC|, ralenti dans la zone de freinage d'un point d'arrêt (Arrive)
        let v = this.vM;
        if (arret && d < this.d0) v = this.vM * d / this.d0;
        if (d > 1e-6) this.PC.scaleToRef(v / d, this.vd);
        else this.vd.setAll(0);

        // Fs = min(|F|, fM) F / |F| avec F = vd - vc
        this.vd.subtractToRef(e.velocity, this.force);
        const f = this.force.length();
        if (f > this.fM) this.force.scaleInPlace(this.fM / f);

        e.applyForce(this.force);

        // regarder dans le sens du déplacement (pas de déplacement en crabe)
        const vc = e.velocity;
        const s = Math.sqrt(vc.x * vc.x + vc.z * vc.z);
        if (s > 0.1) {
            e.direction.set(vc.x / s, 0, vc.z / s);
            if (e.object3d) {
                const o = e.object3d.position;
                e.object3d.lookAt(new BABYLON.Vector3(o.x + vc.x, o.y, o.z + vc.z));
            }
        }
    }
}

export {Trajectoire};
