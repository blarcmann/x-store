import { Product } from "@framework/types";
import http from "@framework/http";
import { API_ENDPOINTS } from "@framework/endpoints";
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
