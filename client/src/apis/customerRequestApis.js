import axios from "axios";

const API_URL = "https://localhost:44384/api";

function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(";").shift();
}

const instance = axios.create({
   baseURL: API_URL,
   headers: {
      Authorization: `Bearer ${getCookie("token")}`,
   },
});

export const getAllCustomerRequestsApi = async (cancelToken) => {
   return await instance.get("/users/customerRequests", {
      cancelToken: cancelToken,
   });
};

export const getAllCustomerRequestsByAccIdApi = async (
   accountId,
   cancelToken
) => {
   return await instance.get("/users/customerRequestsByAccId/" + accountId, {
      cancelToken: cancelToken,
   });
};

export const createCustomerRequestApi = async (submitData) => {
   return await instance.post("/users/customerRequests/create", submitData);
};

export const getCustomerRequestByIdApi = async (requestID) => {
   try {
      const response = await instance.get(
         `/users/customerRequests/${requestID}`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};
export const accecptRequest = async (requestID, staff) => {
   try {
      const response = await instance.post(
         `/users/AcceptRequest?requestID=${requestID}&staffid=${staff}`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};
export const refuseRequest = async (requestID, staff) => {
   try {
      const response = await instance.post(
         `/users/RefusedRequest?requestID=${requestID}&staffid=${staff}`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};

export const getPrice = async (accountId, packageId, Periodic) => {
   try {
      const response = await instance.get(
         `/users/customerRequests/price?accountId=${accountId}&packageId=${packageId}&periodic=${Periodic}`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};

export const getListHealthRecord = async (userId) => {
   try {
      const response = await instance.get(
         `/users/HealthRecords?userId=${userId}`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};

export const getListFeeAffects = async () => {
   try {
      const response = await instance.get(
         `/users/getAllFeeAffect`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};

export const addnewHR = async (data) => {
   try {
      const response = await instance.post(
         `/users/addnewHR`, data
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while fetching account details", error);
   }
};