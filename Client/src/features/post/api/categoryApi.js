import axiosInstance from "../../../services/axios.js";

// Centralized category API calls
export async function getCategories() {
  try {
    const response = await axiosInstance.get("/category/getCategories");
    return response.data.categories;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}
