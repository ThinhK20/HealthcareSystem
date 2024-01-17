import axios from "axios";
const API_URL = "https://localhost:44384/api";
const URL = `${API_URL}/Payments`;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const instance = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
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
export const getPaymentsByAccountID = async (requestID) => {
  try {
    const response = await instance.get(`/GetPaymenOfUser/${requestID}`);
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
  }
};

export const GetLinkCheckOut = async (paymentId, requestId) => {
  try {
    const response = await instance.post("/GetLinkCheckOut", {
      paymentId: paymentId,
      requestId: requestId,
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
  }
};

export const ConfirmPaymentApi = async (token, PayerID) => {
  try {
    const response = await instance.get(
      `/ConfirmPayment?token=${token}&PayerID=${PayerID}`
    );
    return {
      status: "Success"
    }
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
    return {
      status: "Fail"
    }
  }
};
