import characterReducer from "./slices/characterSlice";
import favoritesReducer from "./slices/favoritesSlice";
import historyReducer from "./slices/historySlice";
import userReducer from "./slices/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  character: characterReducer,
  favorites: favoritesReducer,
  history: historyReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
