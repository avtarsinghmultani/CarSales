export const TYPE_CAR: number = 1;
export const TYPE_BOAT: number = 2;
export const TYPE_BIKE: number = 3;

export interface RequestMakesAction {
    type: 'REQUEST_MAKES';
}

export interface ReceivedMakesAction {
    type: 'REQUEST_MAKES_FULFILLED';
    Makes: Make[];
}

export interface RefusedMakesAction {
    type: 'REQUEST_MAKES_REJECTED';
    MakesErrors: [];
}

export interface RequestModelsAction {
    type: 'REQUEST_MODELS';
}

export interface ReceivedModelsAction {
    type: 'REQUEST_MODELS_FULFILLED';
    Models: Model[];
}

export interface RefusedModelsAction {
    type: 'REQUEST_MODELS_REJECTED';
    ModelsErrors: [];
}

export interface RequestBodyTypesAction {
    type: 'REQUEST_BODYTYPES';
}

export interface ReceivedBodyTypesAction {
    type: 'REQUEST_BODYTYPES_FULFILLED';
    BodyTypes: BodyType[];
}

export interface RefusedBodyTypesAction {
    type: 'REQUEST_BODYTYPES_REJECTED';
    BodyTypeErrors: [];
}

export interface RequestAddCarAction {
    type: 'REQUEST_ADD_CAR';
}

export interface ReceivedAddingCarAction {
    type: 'REQUEST_ADD_CAR_FULFILLED';
    success: boolean;
}

export interface RefusedAddingCarAction {
    type: 'REQUEST_ADD_CAR_REJECTED';
    AddCarErrors: [];
}

export interface Make {
    makeId: number;
    makeName: string;
}

export interface Model {
    modelId: number;
    modelName: string;
}

export interface BodyType {
    bodyTypeId: number;
    bodyTypeName: string;
}

export interface Car {
    BodyTypeID?: number;
    ModelID?: number;
    Doors?: number;
    Created?: string;
}