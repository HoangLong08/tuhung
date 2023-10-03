import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, compose, Reducer } from 'redux';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userReducer } from './user/reducer';
import { AppActionType } from './types';
import { productReducer } from './product/reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const appReducers = combineReducers({
  user: userReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof appReducers>;

const rootReducer: Reducer = (state: RootState, action) => {
  // Reset state when logout
  if (action.type === AppActionType.RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }
  return appReducers(state, action);
};

export const resetStoreAction = () => ({
  type: AppActionType.RESET_STATE_ACTION_TYPE,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
