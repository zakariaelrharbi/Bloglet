import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; // Import your authSlice reducer

export default configureStore({
  reducer: {
    auth: authReducer, // Pass your authSlice reducer under the 'auth' key
  },
});