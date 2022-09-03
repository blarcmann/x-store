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
      {/* <BannerSliderBlock /> */}
      <Container>
        {/* <CategoryBlock sectionHeading="text-shop-by-category" /> */}
        {/* <BannerWithProducts
					sectionHeading="text-on-selling-products"
					categorySlug="/search"
					variant="reverse"
				/> */}
        <FlashSaleBlock date={"2023-03-01T01:02:03"} />
        <BrandBlock sectionHeading="text-top-brands" />
        <NewArrivalsProductFeed />
        <BannerCard
          banner={banner[2]}
          href={`${ROUTES.COLLECTIONS}/${banner[2].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />
        <Support />
        {/* <Subscription className="bg-opacity-0 px-5 sm:px-16 xl:px-0 py-12 md:py-14 xl:py-16" /> */}
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale!, [
//         "common",
//         "forms",
//         "menu",
//         "footer",
//       ])),
//     },
//   };
// };
