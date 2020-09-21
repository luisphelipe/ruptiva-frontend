import { post } from "./index.api";

export const createBook = async (values: any, token: string) => {
  return await post("/books", values, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default { createBook };
