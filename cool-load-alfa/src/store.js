import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './reducers/ErrorSlice';
import containerReducer from './reducers/ContainerSlice';
import movimentReducer from './reducers/MovimentSlice';
export default configureStore({
  reducer: {
      erros: errorReducer,
      container: containerReducer,
      moviment: movimentReducer
  },
})