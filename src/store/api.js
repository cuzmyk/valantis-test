import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import md5 from "js-md5";

// Функция для создания хеша авторизационной строки
const createAuthHeader = () => {
  const password = "Valantis";
  const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const authString = `${password}_${timestamp}`;
  return md5(authString);
};

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.valantis.store:41000/",
  prepareHeaders: (headers) => {
    headers.set("X-Auth", createAuthHeader());
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    getIds: builder.query({
      query: (params) => ({
        url: "",
        method: "POST",
        body: {
          action: "get_ids",
          params,
        },
      }),
      transformResponse: (response) => response.result,
      transformErrorResponse: (response, meta, arg) => {
        console.error(
          "Ошибка при запросе getIds:",
          response?.data?.error || "Неизвестная ошибка"
        );
        return response.data.error || "Неизвестная ошибка";
      },
      retry: true,
    }),
    getItems: builder.query({
      query: (params) => ({
        url: "",
        method: "POST",
        body: {
          action: "get_items",
          params,
        },
      }),
      transformResponse: (response) => response.result,
      transformErrorResponse: (response, meta, arg) => {
        console.error(
          "Ошибка при запросе getItems:",
          response?.data?.error || "Неизвестная ошибка"
        );
        return response.data.error || "Неизвестная ошибка";
      },

      retry: true,
    }),
    getFilteredItems: builder.query({
      query: (params) => ({
        url: "",
        method: "POST",
        body: {
          action: "filter",
          params,
        },
      }),
      transformResponse: (response) => response.result,
      transformErrorResponse: (response, meta, arg) => {
        console.error(
          "Ошибка при запросе getFilteredItems:",
          response?.data?.error || "Неизвестная ошибка"
        );
        return response.data.error || "Неизвестная ошибка";
      },

      retry: true,
    }),
    getFields: builder.query({
      query: (params) => ({
        url: "",
        method: "POST",
        body: {
          action: "get_fields",
          params,
        },
      }),
      transformResponse: (response) => response.result,
      transformErrorResponse: (response, meta, arg) => {
        console.error(
          "Ошибка при запросе getFields:",
          response?.data?.error || "Неизвестная ошибка"
        );
        return response.data.error || "Неизвестная ошибка";
      },
      retry: true,
    }),
  }),
});

export const {
  useGetIdsQuery,
  useGetItemsQuery,
  useGetFilteredItemsQuery,
  useGetFieldsQuery,
} = api;
