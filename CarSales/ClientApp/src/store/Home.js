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
    requestAllVehicleTypes: function () { return function (dispatch, getState) {
        // Only load data if it's something we don't already have.
        var appState = getState();
        if (appState && appState.vehicleData) {
            dispatch({ type: 'REQUEST_ALL_VEHICLE_TYPES' });
            axios_1.default.get("api/vehicletypes")
                .then(function (response) {
                var vehicleArray = response.data;
                var vehicleTypes = [];
                for (var index in vehicleArray) {
                    var vehicleTypeId = vehicleArray[index].vehicleTypeID;
                    var vehicleTypeName = vehicleArray[index].name;
                    var modelCount = vehicleArray[index].models.length;
                    var vehicleType = { vehicleTypeId: vehicleTypeId, vehicleTypeName: vehicleTypeName, modelCount: modelCount };
                    vehicleTypes.push(vehicleType);
                }
                //Success Dispatch
                dispatch({ type: 'REQUEST_ALL_VEHICLE_TYPES_FULFILLED', vehicleTypes: vehicleTypes });
            })
                .catch(function (error) {
                dispatch({ type: 'REQUEST_ALL_VEHICLE_TYPES_REJECTED', vehicleTypesErrors: error.response.data });
            });
        }
    }; },
};
//Initial Home state.
var unloadedState = { vehicleTypes: [], vehicleTypesErrors: [], isLoading: false, loaded: false };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_ALL_VEHICLE_TYPES':
            return __assign(__assign({}, state), { isLoading: true });
        case 'REQUEST_ALL_VEHICLE_TYPES_REJECTED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, vehicleTypesErrors: action.vehicleTypesErrors });
        case 'REQUEST_ALL_VEHICLE_TYPES_FULFILLED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, vehicleTypes: action.vehicleTypes });
        default:
            return state;
    }
};
//# sourceMappingURL=Home.js.map