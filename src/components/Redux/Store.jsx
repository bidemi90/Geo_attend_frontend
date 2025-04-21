import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userdata from "./userdata";
import userAttendance from "./userAttendanceSlice";



const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userdata: userdata,
  userAttendance:userAttendance,
  

  
  // Add other reducers here if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(Store);
