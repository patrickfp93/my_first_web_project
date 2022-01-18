import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        value: [],
    },
    reducers: {
        increment: (state, value) => {
            const index = state.value.findIndex((elm)=>{
                return elm.value === value.payload;
            });
            if (index > -1) {
                state.value[index].count++;
            }else if (value.payload && value.payload !== "") {
                state.value.push({value:value.payload,count : 1});
            }
        },
        decrement: (state, value) => {
            const index = state.value.findIndex((elm)=>{
                return elm.value === value;
            });
            if (index > -1) {
                state.value.splice(index, 1);
            }
        },
        decrementById: (state, id) => {
            if (id.payload > -1) {
                state.value.splice(id.payload, 1);
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, decrementById} = errorSlice.actions

export default errorSlice.reducer