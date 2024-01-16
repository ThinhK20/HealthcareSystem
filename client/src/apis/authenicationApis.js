import axios from "axios";
const API_URL = "https://localhost:44384/api/Auth";

const instance = axios.create({
  baseURL: API_URL,
});

export const login = async (accountInfo, config) => {
  try {
    const response = await instance.post("/login", accountInfo, config);
    return response.data;
  } catch (error) {
    console.error("Error occurred while trying to login", error);
  }
};

export const loginByGoogle = async (accountInfo, config) => {
  try {
    const response = await instance.post("/loginByGoogle", accountInfo, config);
    return response.data;
  } catch (error) {
    console.error("Error occurred while trying to login", error);
  }
};

export const register = async (accountInfo, config) => {
  try {
    const response = await instance.post("/register", accountInfo, config);
    return response.data;
  } catch (error) {
    console.error("Error occurred while trying to register", error);
  }
};
export const verifyEmail = async (userid, config) => {
  try {
    const response = await instance.post("/verification", userid, config);
    return response.data;
  } catch (error) {
    console.error("Error occurred while trying to verify", error);
  }
};

export const createAccountForGoogleLogin = async (data) => {
  try {
    const response = await instance.post("/createAccountForGoogleLogin", data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while trying to verify", error);
  }
};
export const generateToken = async (data) => {
  try {
    const response = await instance.post("/generateToken", data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while trying to verify", error);
  }
};

export const checkUserGoogle = async (data) => {
  try {
    const response = await instance.post("/checkEmailByGoogle", data);
    const result = {
      status: response.data.status,
      data: {
        token: response.data.token,
        user: response.data.user,
      },
    };
    return result;
  } catch (error) {
    // console.error("Error occurred while trying to create new user", error);
    const result = {
      status: "Fail",
      data: error.response.data,
    };
    return result;
  }
};
