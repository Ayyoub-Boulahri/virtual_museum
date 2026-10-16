import {PRIMS} from '../prims.js';
import {Component} from './component.js';

// Glass display case (see PRIMS.glassCase).
// data: cote (side of the glass cube), socle (height of the plinth)
// Other components can ask for its inside with entity.limites(r).
class Vitrine extends Component {

    constructor(data, entity){
        super(data, entity);
        const cote = data.cote || 1.6;
        const socle = data.socle ?? 0.8;

        this.entity.object3d = PRIMS.glassCase(entity.name, { cote, socle }, entity.sim.scene);

        this.entity.limites = (r) => {
            const p = entity.position;
            const m = cote / 2 - r;
            return {
                xmin: p.x - m, xmax: p.x + m,
                ymin: p.y + socle + r, ymax: p.y + socle + cote - r,
                zmin: p.z - m, zmax: p.z + m,
            };
        };
    }
}

export {Vitrine};
