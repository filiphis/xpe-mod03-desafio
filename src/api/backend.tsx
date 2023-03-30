import axios from "axios";

async function getDespesasEndpoint(url: string) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error(error);
  } finally {
  }
}

export { getDespesasEndpoint };
