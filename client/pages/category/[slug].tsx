import { Container } from "@components/ui";
import Layout from "@components/layout/layout";
import { ProductGrid } from "@components/shop";
import { CategoryBanner } from "@containers/index";

export default function Category() {
  return (
    <div className="border-t-2 border-borderBottom">
      <Container>
        <CategoryBanner />
        <div className="pb-16 lg:pb-20">
          <ProductGrid className="3xl:grid-cols-6" />
        </div>
      </Container>
    </div>
  );
}

Category.Layout = Layout;
