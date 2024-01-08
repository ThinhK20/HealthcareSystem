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

export const getCustomerRequestByIdApi = async (requestID) => {
   try {
      const response = await axios.get(
         `${API_URL}/users/customerRequests/${requestID}`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};
export const accecptRequest = async (requestID, staff) => {
   try {
      const response = await axios.post(
         `${API_URL}/users/AcceptRequest?requestID=${requestID}&staffid=${staff}`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};
export const refuseRequest = async (requestID) => {
   try {
      const response = await axios.post(
         `${API_URL}/users/RefusedRequest/${requestID}`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};
