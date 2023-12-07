import axios from "axios";
import { RefundRequestStatus } from "../enums/refund-request-status";
const API_URL = "https://localhost:44384/api";

export const createNewRefundRequestApi = async (submitData) => {
   submitData.status = RefundRequestStatus.Pending;
   return await axios.post(API_URL + "/refund-requests/add", submitData, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });
};

export const getAllRefundRequestsApi = async () => {
   return await axios.get(API_URL + "/refund-requests/all");
};

export const getRefundRequestApiById = async (id) => {
   return await axios.get(API_URL + "/refund-requests/" + id);
};

export const acceptRefundRequestApiById = async (id) => {
   return await axios.get(API_URL + "/refund-requests/accept/" + id);
};

export const rejectRefundRequestApiById = async (id) => {
   return await axios.get(API_URL + "/refund-requests/reject/" + id);
};

export const pendingRefundRequestApiById = async (id) => {
   return await axios.get(API_URL + "/refund-requests/pending/" + id);
};
