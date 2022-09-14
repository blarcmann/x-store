import { Product } from "@framework/types";
import http from "@framework/http";
import { API_ENDPOINTS } from "@framework/endpoints";
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
