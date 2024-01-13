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
      const response = await instance.get(`/get-user-by-account/${accountId}`);
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};
export const editAccountsInformation = async (formPost) => {
   try {
      const response = await instance.put("/edit-user", formPost);
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};

export const getAccountByUserID = async (selectedUserId) => {
   try {
      console.log(selectedUserId, 10101010);
      const response = await instance.get(
         `/getAccountIdByUserID/` + Number(selectedUserId)
      );
      return response;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};

export const createUserGoogle = async (data) => {
   try {
      const response = await instance.post("/createNewUser", data);
      return response.data;
   } catch (error) {
      console.error("Error occurred while trying to create new user", error);
   }
};

export const CreateNewStaff = async (info) => {
   try {
      const response = await instance.post("/create-new-staff", info);
      return response.data;
   } catch (error) {
      console.error("Error occurred while trying to create new user", error);
   }
};

export const getAccountByAccountId = async (id) => {
   try {
      const response = await instance.get(`/get-account-by-id/${id}`);
      return response.data;
   } catch (error) {
      console.error("Error occurred while trying to create new user", error);
   }
};
