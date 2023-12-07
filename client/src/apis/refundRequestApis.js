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
