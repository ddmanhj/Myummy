import { useFilterContext } from "@/context";
import { ProductGridCard } from "@/components";
import { getFilteredProducts } from "@/helpers";
import { useGetListDishes } from "@/services/services";
import { DishType } from "@/types/food";

export const FoundResultsCount = () => {
  const { categories, maxPrice, minPrice, rating, search } = useFilterContext();

  const dishes = getFilteredProducts({
    categories,
    maxPrice,
    minPrice,
    rating,
    search,
  });

  return (
    <h6 className="hidden text-base text-default-950 lg:flex">
      {dishes.length ?? 0} Results Found
    </h6>
  );
};

const DishesGrid = () => {
  const { categories, maxPrice, minPrice, rating, search } = useFilterContext();
  const { data: listDishes } = useGetListDishes();

  const dishes = getFilteredProducts({
    categories,
    maxPrice,
    minPrice,
    rating,
    search,
  });

  return (
    <>
      {listDishes?.data?.map((dish: DishType) => (
        <ProductGridCard key={dish.id} dish={dish} />
      ))}
    </>
  );
};

export default DishesGrid;
