import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import Page from "../../components/Page";
import { ProductForm } from "../../components/product";

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { pathname } = useLocation();
  const isEdit = pathname.includes("edit");
  const currentProduct: any = {};

  useEffect(() => {
    // if edit get product details on init
  }, []);

  return (
    <Page title="Ecommerce: Create a new product | Minimal-UI">
      <Container>
        <Typography variant="h2" sx={{ mb: 5 }}>
          {currentProduct && currentProduct.name ? "Edit " : "Create "}Product
        </Typography>
        <Typography variant="overline" display="block" sx={{ mb: 5 }}>
          Product &gt;
          <Typography variant="caption">{' '}Edit Product</Typography>
        </Typography>
        <ProductForm isEdit={isEdit} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
