import axios from "axios";

const API_URL = "https://localhost:44384/api/refund-detail";

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

export const getAllRefundDetailsByRefundIdApi = async (refundId) => {
   try {
      const response = await instance.get(`/allByRefund/${refundId}`);
      return response.data;
   } catch (error) {
      console.error("Error occurred while trying to get users", error);
   }
};
