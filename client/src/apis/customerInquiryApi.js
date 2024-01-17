import axios from "axios";

const API_URL = "https://localhost:44384/api";

const instance = axios.create({
   baseURL: API_URL,
   //    headers:{
   //       "Authorization": `Bearer ${getCookie("token")}`
   //    }
});

export const createInquiry = async (data) => {
   try {
      const response = await instance.post(`/inquiry/create`, data);
      return response.data;
   } catch (error) {
      console.error(
         "Error occurred while trying to delete an insurance",
         error
      );
   }
};
