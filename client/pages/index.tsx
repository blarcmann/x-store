import { BannerCard, Support } from "@components/common";
import { Container, Divider } from "@components/ui";
import Layout from "@components/layout/layout";
// import BannerWithProducts from "@containers/banner-with-products";
import { NewArrivalsProductFeed } from "@components/product/feeds";
// import ProductsFeatured from "@containers/products-featured";
// import BannerSliderBlock from "@containers/banner-slider-block";
import {
  ExclusiveBlock,
  FlashSaleBlock,
  CategoryBlock,
  BrandBlock,
} from "@containers/index";
import { Hero } from "@containers/index";
import { ROUTES } from "@utils/routes";
import { homeFourBanner as banner } from "@framework/static/banner";
// import { GetStaticProps } from "next";

export default function Home() {
  return (
    <>
      <Container>
        <Hero />
      </Container>
      <Container>
        <FlashSaleBlock date={"2023-03-01T01:02:03"} />
        <BrandBlock sectionHeading="text-top-brands" />
        <NewArrivalsProductFeed />
        <Support />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;