import { Product } from "../types";
import http from "../http";
import { API_ENDPOINTS } from "../endpoints";
import { useQuery } from "react-query";

export const fetchProduct = async (id: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.FETCH_PRODUCT}/${id}`);
  return data;
};

export const useFetchProductQuery = (id: any) => {
  return useQuery<any, Error>([API_ENDPOINTS.FETCH_PRODUCT, id], () =>
    fetchProduct(id)
  );
};

export const fetchProducts = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.FETCH_PRODUCTS}`);
  return data;
};

export const useProductsQuery = () => {
  return useQuery<Product[], Error>([API_ENDPOINTS.FETCH_PRODUCTS], () =>
    fetchProducts()
  );
};
