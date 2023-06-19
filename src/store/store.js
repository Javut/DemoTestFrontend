import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
