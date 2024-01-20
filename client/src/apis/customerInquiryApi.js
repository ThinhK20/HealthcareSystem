import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";

const API_URL = "https://localhost:44384/api/inquiry";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const instance = axios.create({
  baseURL: API_URL,
  //    headers:{
  //       "Authorization": `Bearer ${getCookie("token")}`
  //    }
});

export const createInquiry = async (data) => {
  try {
    const response = await instance.post(`/create`, data);
    return {
      status: "Success",
    };
  } catch (error) {
    console.error("Error occurred while trying to delete an insurance", error);
    return {
      status: "Fail",
    };
  }
};

export const getAll = async () => {
  try {
    const response = await instance.get(`/all`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    return {
      status: "Success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error occurred while trying to delete an insurance", error);
    return {
      status: "Fail",
    };
  }
};

export const solveInquiry = async (data) => {
  try {
    const response = await instance.post(`/solveInquiry`, data,{
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    return {
      status: "Success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error occurred while trying to delete an insurance", error);
    return {
      status: "Fail",
    };
  }
};
