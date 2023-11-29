import axios from "axios";

const API_URL = "https://localhost:44384/api";

export const getAllPolicyPackagesApi = async (cancelToken) => {
   return await axios.get(API_URL + "/policy-packages/all", { cancelToken });
};
