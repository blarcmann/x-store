export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: any;
  icon?: string;
  products?: Product[];
  productCount?: number;
};

export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  sale_price?: number;
  image: any;
  sku?: string;
  gallery?: any[];
  category?: Category;
  tags: string[];
  meta?: any[];
  description?: string;
  variations?: object;
};
