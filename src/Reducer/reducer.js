import {SAVE_LOCAL,SAVE_GLOBAL} from "../Constants/constant";

const initialState = {
    global:null,
    local:null
}

export default (state=initialState,action) => {
    const type = action.type;
    const payload = action.payload;
    if(type===SAVE_LOCAL){
        return Object.assign({},state,{
            local:payload
        })
    }
    else
    if(type===SAVE_GLOBAL){
        return Object.assign({},state,{
            global:payload
        })
    }
    return state;
}