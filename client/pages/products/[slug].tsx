import { Container, Divider } from "@components/ui";
import Layout from "@components/layout/layout";
import { ProductDetails } from "@components/product";

export default function ProductPage() {
  return (
    <>
      <Divider className="mb-0" />
      <Container>
        <div className="pt-8"></div>
        <ProductDetails />
      </Container>
    </>
  );
}

ProductPage.Layout = Layout;
