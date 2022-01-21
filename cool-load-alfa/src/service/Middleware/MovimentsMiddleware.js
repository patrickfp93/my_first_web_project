import { Update as UpdateSlice } from '../../reducers/MovimentSlice';
import { getAll,Add,Remove, Edit } from "../crud";
import { increment } from '../../reducers/ErrorSlice';

export const Update = (dispatch) =>{    
    getAll("moviment").then(data => data.json()).then(data => {
        dispatch(UpdateSlice(data));
    });
};

export const Push = (dispatch,value) => {
    Add("moviment",value).then(_ => {
        Update(dispatch);
    }).catch( e =>{
        dispatch(increment(e.toString()))
    });
}

export const Set = (dispatch,value) => {
    Edit("moviment",value).then(_ => {
        Update(dispatch);
    }).catch( e =>{
        dispatch(increment(e.toString()))
    });
}

export const Delete = (dispatch,ids) => {
    Remove("moviment",ids).then(_ =>{
        console.log("sended ids");
        Update(dispatch);
    }).catch( e =>{
        dispatch(increment(e.toString()))
    });
}