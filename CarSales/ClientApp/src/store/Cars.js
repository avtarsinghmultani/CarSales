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
    requestAllCars: function () { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        var appState = getState();
        if (appState && appState.cars) {
            dispatch({ type: 'REQUEST_ALL_CARS' });
            axios_1.default.get("api/cars")
                .then(function (response) {
                var carArray = response.data;
                var data = [];
                for (var index in carArray) {
                    var id = carArray[index].id;
                    var date = carArray[index].created;
                    var make = carArray[index].model.make.name;
                    var model = carArray[index].model.name;
                    var doors = carArray[index].doors;
                    var bodyType = carArray[index].bodyType.name;
                    var car = { id: id, date: date, make: make, model: model, doors: doors, bodyType: bodyType };
                    data.push(car);
                }
                //console.log(data);
                dispatch({ type: 'REQUEST_ALL_CARS_FULFILLED', cars: data });
            })
                .catch(function (error) {
                dispatch({ type: 'REQUEST_ALL_CARS_REJECTED', errors: error.response.data });
            });
        }
    }; }
};
//Initial Reducer state.
var unloadedState = { cars: [], errors: [], isLoading: false, loaded: false };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_ALL_CARS':
            return __assign(__assign({}, state), { isLoading: true });
        case 'REQUEST_ALL_CARS_REJECTED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, errors: action.errors });
        case 'REQUEST_ALL_CARS_FULFILLED':
            return __assign(__assign({}, state), { isLoading: false, loaded: true, cars: action.cars });
        default:
            return state;
    }
};
//# sourceMappingURL=Cars.js.map