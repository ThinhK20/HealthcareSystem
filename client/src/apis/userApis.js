import axios from "axios";

const API_URL = "https://localhost:44384/api";
const instance = axios.create({
   baseURL: API_URL,
 });
export const deleteAccountApi = async (accountId) => {
   return await axios.delete(API_URL + "/delete/" + accountId);
};

export const getAllUsers = async () => {
   try {
      const response = await instance.get("/users/getAll");
      return response.data;
    } catch (error) {
      console.error("Error occurred while trying to get users", error);
    }
};



