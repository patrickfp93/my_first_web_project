import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        value: "",
    },
    reducers: {
        show: (state, value) => {
            state.value = value.payload;
        },
        close: (state) => {
            state.value = "";
        }
    },
})

// Action creators are generated for each case reducer function
export const { show, close} = messageSlice.actions

export default messageSlice.reducer