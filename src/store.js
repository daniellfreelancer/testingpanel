import { configureStore } from "@reduxjs/toolkit";
import reloadSlice from "./features/reloadSlice";
import userReducer from "./features/userApi";
import storage from "redux-persist/lib/storage";
import loginAPI from "./features/loginAPI";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import plannerAPI from "./features/plannerAPI";
import resumeVmAPI from "./features/resumeVmAPI";
import classroomAPI from "./features/classroomAPI";

  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, userReducer)



export const store = configureStore({
    reducer:{
        auth: persistedReducer,
        [loginAPI.reducerPath]: loginAPI.reducer,
        [plannerAPI.reducerPath] : plannerAPI.reducer,
        [resumeVmAPI.reducerPath] : resumeVmAPI.reducer,
        [classroomAPI.reducerPath] : classroomAPI.reducer,
        reload: reloadSlice,
        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(loginAPI.middleware, plannerAPI.middleware, resumeVmAPI.middleware, classroomAPI.middleware )
})


// setupListeners(store.dispatch)
// export default store
export const persistor = persistStore(store)