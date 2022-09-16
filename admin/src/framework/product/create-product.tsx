import http from "../http";
import { API_ENDPOINTS } from "../endpoints";
import { Product } from "../types";
import { useQuery } from "react-query";

export const createProduct = async (product: Product) => {
	const { data } = await http.post(`${API_ENDPOINTS.CREATE_PRODUCT}`, product);
	return data;
};

export const useProductQuery = (product: Product) => {
	return useQuery<Product, Error>([API_ENDPOINTS.CREATE_PRODUCT, product], () =>
    createProduct(product)
	);
};
