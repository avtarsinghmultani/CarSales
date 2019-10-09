"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cars = require("./Cars");
var Home = require("./Home");
var VehicleForm = require("./VehicleForm");
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
exports.reducers = {
    cars: Cars.reducer,
    vehicleData: Home.reducer,
    FormData: VehicleForm.reducer,
};
//# sourceMappingURL=index.js.map