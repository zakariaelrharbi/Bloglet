import axiosInstance from "../../../services/axios.js";

export const updateUser = async (userId, formData) => {
  try {
    const response = await axiosInstance.put(
      `/user/update/${userId}`,
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

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/user/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
