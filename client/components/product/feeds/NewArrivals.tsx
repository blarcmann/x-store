import { ProductsBlock } from "@containers/index";
import { useProductsQuery } from "@framework/product/get-all-products";

export default function NewArrivals() {
  const { data, isLoading, error }: any = useProductsQuery({
    limit: 10,
  });

  return (
    <ProductsBlock
      sectionHeading="text-new-arrivals"
      products={data}
      loading={isLoading}
      error={error?.message}
      uniqueKey="new-arrivals"
    />
  );
}
