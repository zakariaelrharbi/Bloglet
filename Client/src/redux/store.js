import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/authSlice.js";
import userReducer from "../features/user/redux/userSlice.js";
import postReducer from "../features/post/redux/postSlice.js";
import { themeReducer } from "../redux/theme/themeSlice.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);
export { persistor };
