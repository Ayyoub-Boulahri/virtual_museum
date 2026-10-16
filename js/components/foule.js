import {Component} from './component.js';

class Foule extends Component {

    constructor(data, entity){
        super(data, entity);
        if (!entity.applyForce) throw new Error("Foule : l'entité " + entity.name + " doit être une entité Newton");
        this.register();

        this.vM = data.vM || 1.0;
        this.fM = data.fM || 2.0;
        this.ks = data.ks ?? 0.5;
        this.kc = data.kc ?? 0.2;
        this.ka = data.ka ?? 0.3;
        this.rs = data.rs || 1.2;
        this.rv = data.rv || 4.0;
        this.guide     = data.guide || null;
        this.derriere  = data.derriere || 0;
        this.zone      = data.zone || null;
        this.rCamera   = data.rCamera || 2.0;
        this.obstacles = data.obstacles || [];

        const groupe = data.groupe || "foule";
        Foule.groupes[groupe] = Foule.groupes[groupe] || [];
        this.membres = Foule.groupes[groupe];
        this.membres.push(entity);
    }

    // force pour aller vers le point (x, z), en ralentissant à moins de d0 (Arrive)
    arrive(x, z, d0){
        const p = this.entity.position, v = this.entity.velocity;
        const dx = x - p.x, dz = z - p.z;
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d < 1e-6) return new BABYLON.Vector3(-v.x, 0, -v.z);
        const vit = this.vM * Math.min(1, d / d0);
        return new BABYLON.Vector3(dx / d * vit - v.x, 0, dz / d * vit - v.z);
    }

    execute(t){
        const e = this.entity, p = e.position, v = e.velocity;

        // Séparation, cohésion, alignement
        const Fs = new BABYLON.Vector3(0, 0, 0);
        let gx = 0, gz = 0, vx = 0, vz = 0, n = 0;
        const guide = this.guide ? e.sim.getEntity(this.guide) : null;
        const autres = guide ? this.membres.concat([guide]) : this.membres;

        for (const o of autres) {
            if (o === e) continue;
            const dx = p.x - o.position.x, dz = p.z - o.position.z;
            const d2 = dx * dx + dz * dz;
            if (d2 < this.rs * this.rs && d2 > 1e-6) {
                Fs.x += dx / d2;          // PjPi / |PjPi|²
                Fs.z += dz / d2;
            }
            if (o !== guide && d2 < this.rv * this.rv) {
                gx += o.position.x; gz += o.position.z;
                vx += o.velocity.x; vz += o.velocity.z;
                n++;
            }
        }
        const Fc = n > 0 ? this.arrive(gx / n, gz / n, this.rv) : new BABYLON.Vector3(0, 0, 0);
        const Fa = n > 0 ? new BABYLON.Vector3(vx / n - v.x, 0, vz / n - v.z) : new BABYLON.Vector3(0, 0, 0);

        const F = Fs.scale(this.ks).add(Fc.scale(this.kc)).add(Fa.scale(this.ka));

        // Suivre le guide (a) ou un point derrière lui (b)
        if (guide) {
            const dir = guide.direction;
            const cx = guide.position.x - dir.x * this.derriere;
            const cz = guide.position.z - dir.z * this.derriere;
            F.addInPlace(this.arrive(cx, cz, 3.0));
        }

        // Rester dans la zone : on vise le point le plus proche de la zone
        if (this.zone) {
            const z = this.zone;
            const cx = Math.min(Math.max(p.x, z.xmin), z.xmax);
            const cz = Math.min(Math.max(p.z, z.zmin), z.zmax);
            if (cx !== p.x || cz !== p.z) F.addInPlace(this.arrive(cx, cz, 0.5).scale(3));
        }

        // S'écarter de la caméra quand elle est trop proche (même étage)
        const cam = e.sim.camera.position;
        const dxc = p.x - cam.x, dzc = p.z - cam.z;
        const dc = Math.sqrt(dxc * dxc + dzc * dzc);
        if (dc < this.rCamera && Math.abs(cam.y - 1.7 - p.y) < 1.5 && dc > 1e-6) {
            F.addInPlace(new BABYLON.Vector3(dxc / dc * this.vM - v.x, 0, dzc / dc * this.vM - v.z).scale(3));
        }

        // Contourner les obstacles
        for (const o of this.obstacles) {
            const dx = p.x - o.x, dz = p.z - o.z;
            const d = Math.sqrt(dx * dx + dz * dz);
            if (d < o.r && d > 1e-6) F.addInPlace(new BABYLON.Vector3(dx / d, 0, dz / d).scale(3 * (o.r - d)));
        }

        const f = F.length();
        if (f > this.fM) F.scaleInPlace(this.fM / f);
        e.applyForce(F);

        // vitesse limitée à vM, déplacement dans le plan du sol
        v.y = 0;
        const s = Math.sqrt(v.x * v.x + v.z * v.z);
        if (s > this.vM) v.scaleInPlace(this.vM / s);

        // Orientation : sens du déplacement, ou l'œuvre que le guide montre quand le groupe est arrêté
        if (e.object3d) {
            const o = e.object3d.position;
            if (s > 0.15) {
                e.object3d.lookAt(new BABYLON.Vector3(o.x + v.x, o.y, o.z + v.z));
            } else if (guide && guide.regard) {
                e.object3d.lookAt(new BABYLON.Vector3(guide.regard.x, o.y, guide.regard.z));
            }
        }
    }
}

Foule.groupes = {};

export {Foule};
