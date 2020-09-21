import axios from "axios";

const API_URL = "https://ruptiva-luis-phelipe.herokuapp.com";

// That's a very small abstraction lmao

export const get = (endpoint: string, config?: any) =>
  axios.get(`${API_URL}${endpoint}`, config);

export const post = (endpoint: string, data: any, config?: any) =>
  axios.post(`${API_URL}${endpoint}`, data, config);

export const put = (endpoint: string, data: any, config?: any) =>
  axios.put(`${API_URL}${endpoint}`, data, config);

export const destroy = (endpoint: string, config?: any) =>
  axios.delete(`${API_URL}${endpoint}`, config);
