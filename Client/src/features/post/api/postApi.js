import axiosInstance from "../../../services/axios.js";
import { getCategories } from "./categoryApi.js";

export const createPost = async (formData) => {
  try {
    const response = await axiosInstance.post("/post/createPost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getPosts = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axiosInstance.get(
      `/post/getAllPosts?${queryString}`,
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updatePost = async (postId, formData) => {
  try {
    const response = await axiosInstance.put(
      `/post/update/${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deletePost = async (postId, userId) => {
  try {
    const response = await axiosInstance.delete(
      `/post/deletePost/${postId}/${userId}`,
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export { getCategories };
