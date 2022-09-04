import { BannerCard, CategoryListCard } from "@components/common";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
// import { useFlashSaleProductsQuery } from "@framework/product/get-flash-sale-products";
import { useWindowSize } from "@utils/index";
import { homeFourGridBanners as banners } from "@framework/static/banner";
import { CategoryListLoader } from "@components/ui/loaders";
import { ROUTES } from "@utils/routes";
import { Alert } from "@components/ui";

interface Props {
  className?: string;
}



const HeroWithCategoryFlash: React.FC<Props> = ({
  className = "mb-12 md:mb-14 xl:mb-16",
}) => {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-7 2xl:grid-cols-9 gap-5 xl:gap-7 lg:gap-y-14 ${className}`}
    >
      <CategoryListCardSection />

      <div className="col-span-full lg:col-span-5 xl:col-span-5 row-span-full lg:row-auto grid grid-cols-2 gap-2 md:gap-3.5 lg:gap-5 xl:gap-7">
        {banners.map((banner: any) => (
          <BannerCard
            key={`banner--key${banner.id}`}
            banner={banner}
            href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
            className={banner.type === "large" ? "col-span-2" : "col-span-1"}
          />
        ))}
      </div>

      {/* <SellWithProgressCardSection /> */}
    </div>
  );
};

// CategoryList section
export function CategoryListCardSection() {
  const { width } = useWindowSize();
  const { data, isLoading, error } = useCategoriesQuery({
    limit: 10,
  });

  return (
    <>
      {error ? (
        <div className="col-span-full lg:col-span-2">
          <Alert message={error?.message} />
        </div>
      ) : width < 1025 ? (
        <div className="col-span-full">
          {isLoading
            ? Array.from({ length: 7 }).map((_, idx) => (
                <CategoryListLoader
                  uniqueKey={`category-list-${idx}`}
                  key={idx}
                />
              ))
            : data?.categories.data.map((category: any) => (
                <CategoryListCard
                  category={category}
                  key={`sm-category--key${category.id}`}
                />
              ))}
        </div>
      ) : (
        <div className="col-span-full lg:col-span-2 grid grid-cols-1 gap-3 justify-between">
          {isLoading
            ? Array.from({ length: 7 }).map((_, idx) => (
                <CategoryListLoader
                  key={idx}
                  uniqueKey={`category-list-${idx}`}
                />
              ))
            : data?.categories.data
                .slice(0, 7)
                .map((category: any) => (
                  <CategoryListCard
                    key={`lg-category--key${category.id}`}
                    category={category}
                  />
                ))}
        </div>
      )}
    </>
  );
}

export default HeroWithCategoryFlash;
