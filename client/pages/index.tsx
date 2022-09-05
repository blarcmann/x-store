import { Support } from "@components/common";
import { Container, Divider } from "@components/ui";
import Layout from "@components/layout/layout";
import { NewArrivalsProductFeed } from "@components/product/feeds";
import { FlashSaleBlock, BrandBlock } from "@containers/index";
import { Hero } from "@containers/index";

export default function Home() {
  return (
    <>
      <Container>
        <Hero />
      </Container>
      <Container>
        <FlashSaleBlock date={"2023-03-01T01:02:03"} />
        <BrandBlock sectionHeading="Top brands" />
        <NewArrivalsProductFeed />
        <Support />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;
