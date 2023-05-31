import { createStore } from "redux";
import PictureModel from "../Models/PictureModel";



// 1. Global State -
export class PicturesState {
    public pictures: PictureModel[] = [];
    public category:string = " " ;
    public page:number = 1;
    public updateFlag: Boolean = false; 
}

// 2. Action Type - the list of operation we perform on our global state:
export enum PicturesActionType {
    FetchAllPictures = "Fetch All Pictures",
}

//3. Action - a single object which dispatch sends to Redux for some changes:
export interface PicturesAction {
    type: PicturesActionType,
    payload: any;
}


//4. Reducer - a function which will be invoked when calling dispatch to perform the operation 
export function picturesReducer(currentState = new PicturesState(), action: PicturesAction) {

    const newState = { ...currentState };

    switch (action.type) {

        case PicturesActionType.FetchAllPictures: // Here the payload is a list of pictures (PicturesModel[])
            newState.pictures = action.payload;
            newState.updateFlag = !newState.updateFlag;
            break;
    }

    return newState;
}

//5. Store - manager object from redux which handles the entire operations: (dispatch, getState, subscribe)
export const picturesStore = createStore(picturesReducer);