import axios from "axios";

const API_URL = "https://ruptiva-luis-phelipe.herokuapp.com";

// I usually don't do this.

export const get = (endpoint: string) => axios.get(`${API_URL}${endpoint}`);

export const post = (endpoint: string, data: any) =>
  axios.post(`${API_URL}${endpoint}`, data);
