import axios from "axios";

const API_URL = "http://localhost:5002/api/products";

export const getProducts = async (search = "") => {
  const params = search.trim() ? { search: search.trim() } : {};
  const response = await axios.get(API_URL, { params });
  return response.data;
};
