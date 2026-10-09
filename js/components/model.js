import { Component } from "./component.js";
import { PRIMS } from "../prims.js";

class Model extends Component {
    constructor(data, entity) {
        super(data, entity);

        const scene = entity.sim.scene;
        const model = PRIMS.model(data.name || entity.name, data, scene);

        entity.object3d = model;
    }
}

export {Model};