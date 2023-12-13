import axios from "axios";
const API_URL = "https://localhost:44384/api";
const URL = `${API_URL}/Payments`;
const instance = axios.create({
  baseURL: URL,
});

export const getPayments = async () => {
  try {
    const response = await instance.get("/GetAllPaymentRequests");
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
  }
};

export const getPaymentsByID = async (requestID) => {
  try {
    const response = await instance.get(
      `/GetPaymentByRequestID?requestID=${requestID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
  }
};
