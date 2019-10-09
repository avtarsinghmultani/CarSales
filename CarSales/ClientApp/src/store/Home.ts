import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import axios from 'axios';

export interface HomeState {
    isLoading: boolean;
    loaded: boolean;
    vehicleTypes: VehicleType[];
    vehicleTypesErrors: [];
}

export interface VehicleType {
    vehicleTypeId: number;
    vehicleTypeName: string;
    modelCount: number;
}

export interface Make {
    makeId: number;
    makeName: string;
}

export interface Model {
    modelId: number;
    modelName: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestAllVehicleTypesAction {
    type: 'REQUEST_ALL_VEHICLE_TYPES';
}

interface ReceivedAllVehicleTypesAction {
    type: 'REQUEST_ALL_VEHICLE_TYPES_FULFILLED';
    vehicleTypes: VehicleType[];
}

interface RefusedAllVehicleTypesAction {
    type: 'REQUEST_ALL_VEHICLE_TYPES_REJECTED';
    vehicleTypesErrors: [];
}



// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestAllVehicleTypesAction | ReceivedAllVehicleTypesAction | RefusedAllVehicleTypesAction;

export const actionCreators = {
    requestAllVehicleTypes: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        // Only load data if it's something we don't already have.
        const appState = getState();
        if (appState && appState.vehicleData) {

            dispatch({ type: 'REQUEST_ALL_VEHICLE_TYPES' });
            axios.get("api/vehicletypes")
                .then(response => {
                    let vehicleArray = response.data;

                    let vehicleTypes = [];
                    for (let index in vehicleArray) {
                        let vehicleTypeId = vehicleArray[index].vehicleTypeID;
                        let vehicleTypeName = vehicleArray[index].name;
                        let modelCount = vehicleArray[index].models.length;
                        const vehicleType: VehicleType = { vehicleTypeId, vehicleTypeName, modelCount }
                        vehicleTypes.push(vehicleType);

                    }
                    //Success Dispatch
                    dispatch({ type: 'REQUEST_ALL_VEHICLE_TYPES_FULFILLED', vehicleTypes: vehicleTypes });
                })
                .catch((error) => {
                    dispatch({ type: 'REQUEST_ALL_VEHICLE_TYPES_REJECTED', vehicleTypesErrors: error.response.data });
                });
        }
    },

};

//Initial Home state.
const unloadedState: HomeState = { vehicleTypes: [], vehicleTypesErrors: [], isLoading: false, loaded: false };

export const reducer: Reducer<HomeState> = (state: HomeState | undefined, incomingAction: Action): HomeState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ALL_VEHICLE_TYPES':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_ALL_VEHICLE_TYPES_REJECTED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                vehicleTypesErrors: action.vehicleTypesErrors,
            };
        case 'REQUEST_ALL_VEHICLE_TYPES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                vehicleTypes: action.vehicleTypes,
            }
        default:
            return state;
    }
};