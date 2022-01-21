import { Update as UpdateSlice } from './../../reducers/ContainerSlice';
import { getAll,Add,Remove, Edit } from "../crud";
import { increment } from '../../reducers/ErrorSlice';

export const Update = (dispatch) =>{    
    getAll("container").then(data => data.json()).then(data => {
        dispatch(UpdateSlice(data));
    });
};

export const Push = (dispatch,value) => {
    Add("container",value).then(_ => {
        Update(dispatch);
    }).catch( e =>{
        dispatch(increment(e.toString()))
    });
}

export const Set = (dispatch,value) => {
    Edit("container",value).then(_ => {
        Update(dispatch);
    }).catch( e =>{
        dispatch(increment(e.toString()))
    });
}

export const Delete = (dispatch,ids) => {
    
    console.log("ids",ids);
    Remove("container",ids).then(_ =>{
        console.log("sended ids");
        Update(dispatch);
    }).catch( e =>{
        dispatch(increment(e.toString()))
    });
}