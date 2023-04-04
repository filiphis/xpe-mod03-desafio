import axios from "axios";

export const api = axios.create({
  withCredentials: true,
});

async function getDespesasEndpoint(url: string) {
  try {
    const response = await api.get(url);
    return response;
  } catch (error) {
    console.error(error);
  } finally {
  }
}

async function getSessionStatus(url: string) {
  try {
    const response = await api.get(url);
    console.log("response", response);
    if (response) {
      console.log("TEM RESPONSE");
    } else {
      console.log("NAO TEM RESPONSE");
    }
    const { data } = response;
    return data;
  } catch (error) {
    console.error("backend ::: getSessionStatus :::", error);
  }
}

export { getDespesasEndpoint, getSessionStatus };
