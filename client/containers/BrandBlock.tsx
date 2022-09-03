import { Card, SectionHeader } from "@components/common";
// import Carousel from "@components/ui/carousel/carousel";
// import { SwiperSlide } from "swiper/react";
import { CardLoader } from "@components/ui/loaders";
import { useBrandsQuery } from "@framework/brand/get-all-brands";
import { ROUTES } from "@utils/routes";
import { Alert } from "@components/ui";

interface BrandProps {
  sectionHeading: string;
  className?: string;
}

// const breakpoints = {
//   "1720": {
//     slidesPerView: 8,
//     spaceBetween: 28,
//   },
//   "1400": {
//     slidesPerView: 7,
//     spaceBetween: 28,
//   },
//   "1025": {
//     slidesPerView: 6,
//     spaceBetween: 28,
//   },
//   "768": {
//     slidesPerView: 5,
//     spaceBetween: 20,
//   },
//   "500 ": {
//     slidesPerView: 4,
//     spaceBetween: 20,
//   },
//   "0": {
//     slidesPerView: 3,
//     spaceBetween: 12,
//   },
// };

const BrandBlock: React.FC<BrandProps> = ({
  className = "mb-11 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0",
  sectionHeading,
}) => {
  const { data, isLoading, error } = useBrandsQuery({
    limit: 8,
  });
  const brands = data?.brands;
  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />

      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="-mt-8 md:-mt-12">
          {isLoading && !data
            ? Array.from({ length: 10 }).map((_, idx) => (
                <CardLoader uniqueKey={`category-${idx}`} key={idx} />
              ))
            : brands?.map((brand, idx) => (
                <Card
                  key={idx}
                  item={brand}
                  variant="rounded"
                  size="medium"
                  href={{
                    pathname: ROUTES.SEARCH,
                    query: { brand: brand.slug },
                  }}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default BrandBlock;
