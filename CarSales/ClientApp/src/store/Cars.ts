import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import axios from 'axios';

export interface CarsState {
    isLoading: boolean;
    loaded: boolean;
    cars: Car[];
    errors: [];
}

export interface Car {
    id: number;
    date: string;
    make: string;
    model: string;
    doors: number;
    bodyType: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestAllCarsAction {
    type: 'REQUEST_ALL_CARS';
}

interface ReceivedAllCarsAction {
    type: 'REQUEST_ALL_CARS_FULFILLED';
    cars: Car[];
}

interface RefusedAllCarsAction {
    type: 'REQUEST_ALL_CARS_REJECTED';
    errors: [];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestAllCarsAction | ReceivedAllCarsAction | RefusedAllCarsAction;

export const actionCreators = {
    requestAllCars: () : AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.cars) {
            dispatch({ type: 'REQUEST_ALL_CARS' });
            axios.get("api/cars")
                .then(response => {
                    let carArray = response.data;
                    let data = [];
                    for (var index in carArray) {
                        var id = carArray[index].id;
                        var date = carArray[index].created;
                        var make = carArray[index].model.make.name;
                        var model = carArray[index].model.name;
                        var doors = carArray[index].doors;
                        var bodyType = carArray[index].bodyType.name;
                        const car: Car = { id, date, make, model, doors, bodyType }
                        data.push(car);
                    }
                    //console.log(data);
                    dispatch({ type: 'REQUEST_ALL_CARS_FULFILLED', cars: data });
                })
                .catch((error) => {
                    dispatch({ type: 'REQUEST_ALL_CARS_REJECTED', errors: error.response.data });
                });
        }
    }


};

//Initial Reducer state.
const unloadedState: CarsState = { cars: [], errors: [], isLoading: false, loaded: false };

export const reducer: Reducer<CarsState> = (state: CarsState | undefined, incomingAction: Action): CarsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ALL_CARS':
            return { ...state,
                isLoading: true
            };
        case 'REQUEST_ALL_CARS_REJECTED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                errors: action.errors,
            };
        case 'REQUEST_ALL_CARS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                cars: action.cars,
            }
        default:
            return state;
    }
};