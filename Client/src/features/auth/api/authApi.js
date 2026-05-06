import axiosInstance from "../../../services/axios.js";

// Centralized auth API calls
export async function signIn(payload) {
  try {
    const response = await axiosInstance.post("/signin", payload);
    return { ok: true, status: response.status, data: response.data };
  } catch (error) {
    return {
      ok: false,
      status: error.response?.status || 500,
      data: error.response?.data || error.message,
    };
  }
}

export async function signUp(payload) {
  try {
    const response = await axiosInstance.post("/signup", payload);
    return { ok: true, status: response.status, data: response.data };
  } catch (error) {
    return {
      ok: false,
      status: error.response?.status || 500,
      data: error.response?.data || error.message,
    };
  }
}

export async function signOut() {
  try {
    const response = await axiosInstance.post("/signout");
    return { ok: true, status: response.status, data: response.data };
  } catch (error) {
    return {
      ok: false,
      status: error.response?.status || 500,
      data: error.response?.data || error.message,
    };
  }
}

export default {
  signIn,
  signUp,
  signOut,
};
