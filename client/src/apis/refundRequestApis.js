import axios from "axios";
import { RefundRequestStatus } from "../enums/refund-request-status";
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

export const createNewRefundRequestApi = async (submitData) => {
   submitData.status = RefundRequestStatus.Pending;
   return await instance.post("/refund-requests/add", submitData, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });
};

export const updateRefundRequestApi = async (submitData) => {
   return await instance.put("/refund-requests/update", submitData, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });
};

export const getAllRefundRequestsApi = async () => {
   return await instance.get("/refund-requests/all");
};

export const getAllRefundRequestByUserIdApi = async (userId, cancelToken) => {
   console.log("userId: ", userId);
   return await instance.get("/refund-requests?accountId=" + userId, {
      cancelToken: cancelToken,
   });
};

export const getRefundRequestApiById = async (id) => {
   return await instance.get("/refund-requests/" + id);
};

export const acceptRefundRequestApiById = async (id) => {
   return await instance.get("/refund-requests/accept/" + id);
};

export const rejectRefundRequestApiById = async (id) => {
   return await instance.get("/refund-requests/reject/" + id);
};

export const pendingRefundRequestApiById = async (id) => {
   return await instance.get("/refund-requests/pending/" + id);
};
