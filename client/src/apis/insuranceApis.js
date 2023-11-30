import axios from "axios";

const API_URL = "https://localhost:44384/api";

export const getAllInsurancesApi = async (cancelToken) => {
   await axios.get(API_URL + "/insurances/all", { cancelToken });
};
