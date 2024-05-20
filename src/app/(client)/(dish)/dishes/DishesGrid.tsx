import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductGridCard } from "@/components";
import { DishType } from "@/types/food";
import { useGetListFood } from "@/services/services";
import { ProductPaginationStateProps } from "@/types/other";
import { useDebouncedCallback } from "use-debounce";

export const FoundResultsCount = () => {
  return (
    <h6 className="hidden text-base text-default-950 lg:flex">
      0 Results Found
    </h6>
  );
};

const DishesGrid = ({
  currentPage,
  setTotalItem,
}: ProductPaginationStateProps) => {
  const { categories, priceRange, rating, search } = useSelector(
    (state: { filterDish: any }) => state?.filterDish
  );

  const { data: listFood, refetch: callApiGetListFood } = useGetListFood(
    currentPage.page,
    currentPage.limit,
    categories,
    priceRange,
    rating,
    search
  );

  // Sử dụng useDebouncedCallback để debounce việc gọi API
  const debouncedCallApiGetListFood = useDebouncedCallback(
    callApiGetListFood,
    700
  );

  // Sử dụng useEffect để gọi hàm debounce khi có sự thay đổi trong search
  useEffect(() => {
    debouncedCallApiGetListFood();
  }, [search]);

  useEffect(() => {
    setTotalItem(listFood?.data?.count);
  }, [listFood?.data?.count]);

  useEffect(() => {
    callApiGetListFood();
  }, [categories, priceRange, rating, currentPage]);

  return (
    <>
      {listFood?.data?.rows?.map((dish: DishType) => (
        <ProductGridCard key={dish.id} dish={dish} />
      ))}
    </>
  );
};

export default DishesGrid;
