import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './reducers/ErrorSlice';
import messageReducer from './reducers/MessageSlice';
export default configureStore({
  reducer: {
      erros: errorReducer,
      message:messageReducer
  },
})