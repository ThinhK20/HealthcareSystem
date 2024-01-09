import axios from "axios";
const API_URL = "https://localhost:44384/api";
const URL = `${API_URL}/policy-packages`;
const URL2 = `${API_URL}/InsuarancePolicy`;

const instance = axios.create({
  baseURL: URL,
});

const instance2 = axios.create({
  baseURL: URL2,
});

export const getAllPackage = async () => {
  try {
    const response = await instance.get("/all");
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
  }
};

export const getAllPolicyPackagesApi = async (cancelToken) => {
  return await axios.get(URL + "/all", { cancelToken });
};

export const getAllPackageById = async (id) => {
  try {
    const response = await instance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
  }
};
//https://localhost:44384/api/InsuarancePolicy

export const getAllPolicy = async () => {
  try {
    const response = await instance2.get();
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
  }
};

export const createNewPackage = async (submitData) => {
  try {
    const response = await instance.post("/CreateNew", submitData);
    const message = {
      status: "Success",
      data: response.data,
    };
    return message;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
    const message = {
      status: "Fail",
    };
    return message;
  }
};

export const editPackage = async (submitData) => {
  try {
    const response = await instance.put("/edit", submitData);
    const message = {
      status: "Success",
      data: response.data,
    };
    return message;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
    const message = {
      status: "Fail",
    };
    return message;
  }
};

export const InActivePackage = async (packageId) => {
  try {
    const response = await instance.delete(`/inactive/${packageId}`);
    const message = {
      status: "Success",
      data: response.data,
    };
    return message;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
    const message = {
      status: "Fail",
    };
    return message;
  }
};

export const ActivePackage = async (packageId) => {
  try {
    const response = await instance.put(`/active/${packageId}`);
    const message = {
      status: "Success",
      data: response.data,
    };
    return message;
  } catch (error) {
    console.error("Error occurred while fetching account details", error);
    const message = {
      status: "Fail",
    };
    return message;
  }
};
