import axios from "axios";
const API_URL = "https://localhost:44384/api";
const URL = `${API_URL}/Accounts`;

const instance = axios.create({
   baseURL: URL,
});

export const getAccounts = async () => {
   try {
      const response = await instance.get("/get-all-account");
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};

export const updateAccountsPassword = async (formPut) => {
   try {
      const response = await instance.put("/change-password", formPut);
      return response.data;
   } catch (error) {
      console.error("Error occurred while updating account details", error);
   }
};
export const updateAccountsInformation = async (formPut) => {
   try {
      const response = await instance.put("/edit-user-staff", formPut);
      return response.data;
   } catch (error) {
      console.error("Error occurred while updating account details", error);
   }
};
export const getAccountsInformation = async (accountId) => {
   try {
      const response = await instance.get(
         `/get-user-staff?AccountID=${accountId}`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};
export const editAccountsInformation = async (formPost) => {
   try {
      const response = await instance.put("/edit-user-staff", formPost);
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};

export const getAccountByUserID = async (selectedUserId) => {
   try {
      console.log(selectedUserId);
      const response = await instance.get(
         `/getAccountIdByUserID/` + selectedUserId
      );
      return response;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};
<<<<<<< HEAD

export const createUserGoogle = async (data) => {
  try {
     const response = await instance.post("/createNewUser", data);
     return response.data;
   } catch (error) {
     console.error("Error occurred while trying to create new user", error);
   }
};
=======
>>>>>>> 7862d9ad5c8d91b7c94f439202089898e5ccf5dc
