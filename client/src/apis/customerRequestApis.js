import axios from "axios";

const API_URL = "https://localhost:44384/api";

export const getAllCustomerRequestsApi = async (cancelToken) => {
   return await axios.get(API_URL + "/users/customerRequests", {
      cancelToken: cancelToken,
   });
};

export const createCustomerRequestApi = async (submitData) => {
   return await axios.post(
      API_URL + "/users/customerRequests/create",
      submitData
   );
};
