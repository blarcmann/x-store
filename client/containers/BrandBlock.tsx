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
        <div className="flex justify-between my-2">
          {isLoading && !data
            ? Array.from({ length: 10 }).map((_, idx) => (
                <CardLoader uniqueKey={`category-${idx}`} key={idx} />
              ))
            : brands?.map((brand, idx) => (
                <Card
                  key={idx}
                  item={brand}
                  variant="rounded"
                  size="small"
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
