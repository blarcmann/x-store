import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Page from "../../components/Page";
import { ProductForm } from "../../components/product";
import { createProduct } from "../../framework/product/create-product";
import { Product } from "../../framework/types";

export default function EcommerceProductCreate() {
  const { pathname } = useLocation();
  const isEdit = pathname.includes("edit");
  const currentProduct: any = {};

  useEffect(() => {
    // if edit get product details on init
  }, []);

  const submitProduct = (product: Product) => {
    createProduct(product);
    console.log("submitted");
  };

  return (
    <Page title="Create new product">
      <Container>
        <Typography variant="h2" sx={{ mb: 5 }}>
          {currentProduct && currentProduct.name ? "Edit " : "Create "}Product
        </Typography>
        <Typography variant="overline" display="block" sx={{ mb: 5 }}>
          Product &gt;
          <Typography variant="caption"> Edit Product</Typography>
        </Typography>
        <ProductForm
          isEdit={isEdit}
          currentProduct={currentProduct}
          {...{ submitProduct }}
        />
      </Container>
    </Page>
  );
}
