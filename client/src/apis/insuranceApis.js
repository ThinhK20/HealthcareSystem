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
export const getAllInsurancesApi = async (cancelToken) => {
   await instance.get("/insurances/all", { cancelToken });
};

export const getAllInsurance = async () => {
   try {
      const response = await instance.get("/insurances/all");
      return response.data;
   } catch (error) {
      console.error("Error occurred while trying to get insurances", error);
   }
};

export const deleteInsurance = async (index) => {
   try {
      const response = await instance.delete(`/insurances/${index}`);
      return response;
   } catch (error) {
      console.error(
         "Error occurred while trying to delete an insurance",
         error
      );
   }
};

export const updateInsurance = async (data) => {
   try {
      const response = await instance.put(`/insurances`, data);
      return response.data;
   } catch (error) {
      console.error(
         "Error occurred while trying to delete an insurance",
         error
      );
   }
};
export const createInsurance = async (data) => {
   try {
      const response = await instance.post(`/insurances`, data);
      return response.data;
   } catch (error) {
      console.error(
         "Error occurred while trying to delete an insurance",
         error
      );
   }
};

export const getInsuranceOnPage = async (pageSize = 2, pageNumber = 1) => {
   try {
      const response = await instance.get(
         `/insurances/insurancesOnPage?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      return response.data;
   } catch (error) {
      console.error("Error occurred while trying to get insurances", error);
   }
};
