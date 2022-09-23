import { Product } from "../types";
import http from "../http";
import { API_ENDPOINTS } from "../endpoints";
import { useQuery } from "react-query";

export const fetchProduct = async (_slug: string) => {
	const { data } = await http.get(`${API_ENDPOINTS.FETCH_PRODUCT}`);
	return data;
};

export const useProductQuery = (slug: string) => {
	return useQuery<Product, Error>([API_ENDPOINTS.FETCH_PRODUCT, slug], () =>
		fetchProduct(slug)
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
