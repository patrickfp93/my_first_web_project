import { createSlice } from '@reduxjs/toolkit'

export const movimentSlice = createSlice({
    name: 'moviment',
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
export const { Update} = movimentSlice.actions

export default movimentSlice.reducer