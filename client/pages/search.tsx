import { Container } from "@components/ui";
import Layout from "@components/layout/layout";
import { ShopFilters } from "@components/shop";
import { ProductGrid } from "@components/shop";

export default function Search() {
  return (
    <>
      <Container>
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
            <div className="flex-shrink-0 pe-24 hidden lg:block w-80">
              <ShopFilters />
            </div>
          </div>

          <div className="w-full lg:-ms-9 mt-7">
            <ProductGrid />
          </div>
        </div>
      </Container>
    </>
  );
}

Search.Layout = Layout;
