import { get, post, put, destroy } from "./index.api";

export const getBooks = async (token: string) => {
  return await get("/books", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createBook = async (values: any, token: string) => {
  return await post("/books", values, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateBook = async (id: string, values: any, token: string) => {
  return await put(`/books/${id}`, values, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteBook = async (id: string, token: string) => {
  return await destroy(`/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default { createBook, deleteBook };
