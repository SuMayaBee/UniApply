// src/Common/Store/configureStore.js

import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './Reducers';
import rootSaga from './Sagas/rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['main'], // your auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 1️⃣ Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2️⃣ Configure the store with the proper middleware callback:
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // allows redux-persist actions
    }).concat(sagaMiddleware),
});

// 3️⃣ Then run your root saga
sagaMiddleware.run(rootSaga);

// 4️⃣ Finally, create the persistor
export const persistor = persistStore(store);
