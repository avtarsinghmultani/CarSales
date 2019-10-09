"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
exports.actionCreators = {
    // An action to find Vehichle types 
    requestMakes: function (vehicleTypeId) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.FormData) {
            dispatch({ type: 'REQUEST_MAKES' });
            axios_1.default.get("api/vehicletypes/" + vehicleTypeId)
                .then(function (response) {
                var vehicleArray = response.data.vehicleTypeMakes;
                var Makes = [];
                for (var index in vehicleArray) {
                    var makeId = vehicleArray[index].makeID;
                    var makeName = vehicleArray[index].make.name;
                    var Make = { makeId: makeId, makeName: makeName };
                    Makes.push(Make);
                }
                //Diapatch if success.
                dispatch({ type: 'REQUEST_MAKES_FULFILLED', Makes: Makes });
            })
                .catch(function (error) {
                dispatch({ type: 'REQUEST_MAKES_REJECTED', MakesErrors: error.response.data });
            });
        }
    }; },
    // action to find models of a specific make.
    requestModels: function (makeId) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.FormData) {
            dispatch({ type: 'REQUEST_MODELS' });
            axios_1.default.get("api/makes/" + makeId)
                .then(function (response) {
                var modelsArray = response.data.models;
                var Models = [];
                for (var index in modelsArray) {
                    var modelId = modelsArray[index].modelID;
                    var modelName = modelsArray[index].name;
                    var Model = { modelId: modelId, modelName: modelName };
                    Models.push(Model);
                }
                //Dispatch success
                dispatch({ type: 'REQUEST_MODELS_FULFILLED', Models: Models });
            })
                .catch(function (error) {
                //dispatch errors.
                dispatch({ type: 'REQUEST_MODELS_REJECTED', ModelsErrors: error.response.data });
            });
        }
    }; },
    // Action to request bodyTypes.
    requestBodyTypes: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.FormData) {
            dispatch({ type: 'REQUEST_BODYTYPES' });
            axios_1.default.get("api/bodytypes")
                .then(function (response) {
                console.log("Array from server");
                console.log(response.data);
                var bodyTypesArray = response.data;
                var BodyTypes = [];
                for (var index in bodyTypesArray) {
                    var bodyTypeId = bodyTypesArray[index].bodyTypeID;
                    var bodyTypeName = bodyTypesArray[index].name;
                    var bodyType = { bodyTypeId: bodyTypeId, bodyTypeName: bodyTypeName };
                    BodyTypes.push(bodyType);
                }
                dispatch({ type: 'REQUEST_BODYTYPES_FULFILLED', BodyTypes: BodyTypes });
            })
                .catch(function (error) {
                dispatch({ type: 'REQUEST_BODYTYPES_REJECTED', BodyTypeErrors: error.response.data });
            });
        }
    }; },
    // Post call for Car submission.
    submitCar: function (Car) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.FormData) {
            dispatch({ type: 'REQUEST_ADD_CAR' });
            axios_1.default.post("api/cars", {
                Created: new Intl.DateTimeFormat('en-US').format(Date.now()),
                BodyTypeID: Car.BodyTypeID,
                ModelID: Car.ModelID,
                Doors: Car.Doors
            })
                .then(function (response) {
                dispatch({ type: 'REQUEST_ADD_CAR_FULFILLED', success: true });
            })
                .catch(function (error) {
                dispatch({ type: 'REQUEST_ADD_CAR_REJECTED', AddCarErrors: error.response.data });
            });
        }
    }; },
};
// Initial state for Vehicle Form values.
var unloadedState = {
    Makes: [],
    Models: [],
    MakesErrors: [],
    ModelsErrors: [],
    BodyTypes: [],
    BodyTypeErrors: [],
    isLoading: false,
    loaded: false,
    success: false,
    AddCarErrors: [],
};
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_MAKES':
            return __assign(__assign({}, state), { isLoading: true });
        case 'REQUEST_MAKES_REJECTED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, MakesErrors: action.MakesErrors });
        case 'REQUEST_MAKES_FULFILLED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, Makes: action.Makes });
        case 'REQUEST_MODELS':
            return __assign(__assign({}, state), { isLoading: true });
        case 'REQUEST_MODELS_REJECTED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, ModelsErrors: action.ModelsErrors });
        case 'REQUEST_MODELS_FULFILLED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, Models: action.Models });
        case 'REQUEST_BODYTYPES':
            return __assign(__assign({}, state), { isLoading: true });
        case 'REQUEST_BODYTYPES_REJECTED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, BodyTypeErrors: action.BodyTypeErrors });
        case 'REQUEST_BODYTYPES_FULFILLED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, BodyTypes: action.BodyTypes });
        case 'REQUEST_ADD_CAR':
            return __assign(__assign({}, state), { isLoading: true });
        case 'REQUEST_ADD_CAR_REJECTED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, AddCarErrors: action.AddCarErrors });
        case 'REQUEST_ADD_CAR_FULFILLED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, success: action.success });
        default:
            return state;
    }
};
//# sourceMappingURL=VehicleForm.js.map