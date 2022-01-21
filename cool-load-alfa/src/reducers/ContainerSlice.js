import { createSlice } from '@reduxjs/toolkit'

export const containerSlice = createSlice({
    name: 'container',
    initialState: {
        value: [],
    },
    reducers: {
        Update(state,value){
            state.value = value.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { Update} = containerSlice.actions

export default containerSlice.reducer