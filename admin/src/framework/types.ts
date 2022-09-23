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
  title: string;
  price: number;
  sale_price?: number;
  images: any;
  sku?: string;
  category?: Category;
  tags: string[];
  inStock: boolean;
  description?: string;
};
