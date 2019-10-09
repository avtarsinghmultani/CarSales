import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import {
    RequestMakesAction, ReceivedMakesAction, RefusedMakesAction, RequestModelsAction, ReceivedModelsAction, RefusedModelsAction,
    RequestBodyTypesAction, ReceivedBodyTypesAction, RefusedBodyTypesAction, ReceivedAddingCarAction, RefusedAddingCarAction, RequestAddCarAction,
    Make, Model, BodyType, Car
} from './Constants'
import axios from 'axios';

export interface VehicleFormState {
    isLoading: boolean;
    loaded: boolean;
    Makes: Make[];
    Models: Model[];
    MakesErrors: [];
    ModelsErrors: [];
    BodyTypes: BodyType[];
    BodyTypeErrors: [];
    AddCarErrors: [];
    success: boolean;
}
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.



// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestMakesAction | ReceivedMakesAction | RefusedMakesAction
    | RequestModelsAction | ReceivedModelsAction | RefusedModelsAction
    | RequestBodyTypesAction | ReceivedBodyTypesAction | RefusedBodyTypesAction
    | RequestAddCarAction | RefusedAddingCarAction | ReceivedAddingCarAction;

export const actionCreators = {
   // An action to find Vehichle types 
    requestMakes: (vehicleTypeId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const appState = getState();
        if (appState && appState.FormData) {

            dispatch({ type: 'REQUEST_MAKES' });

            axios.get("api/vehicletypes/" + vehicleTypeId)
                .then(response => {

                    let vehicleArray = response.data.vehicleTypeMakes;
                    let Makes = [];

                    for (let index in vehicleArray) {
                        let makeId = vehicleArray[index].makeID;
                        let makeName = vehicleArray[index].make.name;
                        const Make: Make = { makeId, makeName }
                        Makes.push(Make);
                    }
                    //Diapatch if success.
                    dispatch({ type: 'REQUEST_MAKES_FULFILLED', Makes: Makes });
                })
                .catch((error) => {
                    dispatch({ type: 'REQUEST_MAKES_REJECTED', MakesErrors: error.response.data });
                });
        }
    },

    // action to find models of a specific make.
    requestModels: (makeId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.FormData) {

            dispatch({ type: 'REQUEST_MODELS' });

            axios.get("api/makes/" + makeId)
                .then(response => {

                    let modelsArray = response.data.models;

                    let Models = [];
                    for (let index in modelsArray) {
                        let modelId = modelsArray[index].modelID;
                        let modelName = modelsArray[index].name;
                        const Model: Model = { modelId, modelName }
                        Models.push(Model);

                    }
                    //Dispatch success
                    dispatch({ type: 'REQUEST_MODELS_FULFILLED', Models: Models });
                })
                .catch((error) => {
                    //dispatch errors.
                    dispatch({ type: 'REQUEST_MODELS_REJECTED', ModelsErrors: error.response.data });
                });
        }
    },


    // Action to request bodyTypes.
    requestBodyTypes: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.FormData) {

            dispatch({ type: 'REQUEST_BODYTYPES' });
            axios.get("api/bodytypes")
                .then(response => {
                    console.log("Array from server")
                    console.log(response.data);
                    let bodyTypesArray = response.data;

                    let BodyTypes = [];
                    for (let index in bodyTypesArray) {
                        let bodyTypeId = bodyTypesArray[index].bodyTypeID;
                        let bodyTypeName = bodyTypesArray[index].name;
                        const bodyType: BodyType = { bodyTypeId, bodyTypeName }
                        BodyTypes.push(bodyType);

                    }
                    dispatch({ type: 'REQUEST_BODYTYPES_FULFILLED', BodyTypes: BodyTypes });
                })
                .catch((error) => {
                    dispatch({ type: 'REQUEST_BODYTYPES_REJECTED', BodyTypeErrors: error.response.data });
                });
        }
    },

    // Post call for Car submission.
    submitCar: (Car: Car): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const appState = getState();
        if (appState && appState.FormData) {

            dispatch({ type: 'REQUEST_ADD_CAR' });
            axios.post("api/cars", {
                Created: new Intl.DateTimeFormat('en-US').format(Date.now()),
                BodyTypeID: Car.BodyTypeID,
                ModelID: Car.ModelID,
                Doors: Car.Doors
                })
                .then(response => {
                    dispatch({ type: 'REQUEST_ADD_CAR_FULFILLED', success: true });
                })
                .catch((error) => {
                    dispatch({ type: 'REQUEST_ADD_CAR_REJECTED', AddCarErrors: error.response.data });
                });
        }
    },



};

// Initial state for Vehicle Form values.
const unloadedState: VehicleFormState = {
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

export const reducer: Reducer<VehicleFormState> = (state: VehicleFormState | undefined, incomingAction: Action): VehicleFormState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_MAKES':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_MAKES_REJECTED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                MakesErrors: action.MakesErrors,
            };
        case 'REQUEST_MAKES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                Makes: action.Makes,
            }
        case 'REQUEST_MODELS':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_MODELS_REJECTED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                ModelsErrors: action.ModelsErrors,
            };
        case 'REQUEST_MODELS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                Models: action.Models,
            }
        case 'REQUEST_BODYTYPES':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_BODYTYPES_REJECTED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                BodyTypeErrors: action.BodyTypeErrors,
            };
        case 'REQUEST_BODYTYPES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                BodyTypes: action.BodyTypes,
            }
        case 'REQUEST_ADD_CAR':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_ADD_CAR_REJECTED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                AddCarErrors: action.AddCarErrors,
            };
        case 'REQUEST_ADD_CAR_FULFILLED':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                success: action.success,
            }

        default:
            return state;
    }
};