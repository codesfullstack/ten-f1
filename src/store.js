import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import cityReducer from './reducers/cityReducer';
import paramPlace from './reducers/cityReducer';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cities: cityReducer, // AsegÃºrate de agregar el reducer de ciudades aquÃ­
    paramPlace: paramPlace,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
