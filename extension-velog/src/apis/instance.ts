import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  withCredentials: true,
});

type ErrorType = {
  code: string;
  statusCode: 500;
};

export type BaseType<T> = {
  data: T;
  error: null | ErrorType;
  message: string;
  success: boolean;
};
