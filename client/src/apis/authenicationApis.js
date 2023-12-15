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
export const register = async (accountInfo, config) => {
  try {
    const response = await instance.post("/register", accountInfo, config);
    console.log(6666666, response)
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