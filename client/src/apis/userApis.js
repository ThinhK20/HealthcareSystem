import axios from "axios";

const API_URL = "https://localhost:44384/api";

function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
 }

const instance = axios.create({
   baseURL: API_URL,
   headers:{
      "Authorization": `Bearer ${getCookie("token")}`
   }
});
export const deleteAccountApi = async (accountId) => {
   return await instance.delete("/Accounts/delete/" + accountId);
};

export const getAllUsers = async () => {
   try {
      const response = await instance.get("/users/getAll");
      return response.data;
   } catch (error) {
      console.error("Error occurred while trying to get users", error);
   }
};

export const getUserByEmail = async (email) => {
   try {
      const response = await instance.get(`/users/getUserByEmail?email=${email}`);
      return response.data;
   } catch (error) {
      console.error("Error occurred while trying to get users", error);
   }
};



