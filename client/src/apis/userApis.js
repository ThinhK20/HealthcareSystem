import axios from "axios";

const API_URL = "https://localhost:44384/";

export const deleteAccountApi = async (accountId) => {
   return await axios.delete(API_URL + "/delete/" + accountId);
};
