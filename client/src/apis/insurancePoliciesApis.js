import axios from "axios";
const API_URL = "https://localhost:44384/api/";


const instance = axios.create({
  baseURL: API_URL,
});

export const createPolicy = async (data) => {
  try {
    const response = await instance.post(`InsuarancePolicy`, data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while trying to create an insurance policy", error);
  }
};
export const updatePolicy = async (data) => {
  try {
    console.log(65666666666)
    const response = await instance.put("InsuarancePolicy", data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while trying to update an insurance policy", error);
  }
};
export const deletePolicy = async (data) => {
    try {
      const response = await instance.delete(`/InsuarancePolicy/${data}`);
      return response.data;
    } catch (error) {
      console.error("Error occurred while trying to update an insurance policy", error);
    }
};
export const getAll = async () => {
    try {
      const response = await instance.get("/InsuarancePolicy")
      return response.data;
    } catch (error) {
      console.error("Error occurred while trying to update an insurance policy", error);
    }
};
  
  
