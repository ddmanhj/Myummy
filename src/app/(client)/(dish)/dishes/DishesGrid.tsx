import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductGridCard } from "@/components";
import { DishType } from "@/types/food";
import { useGetListFood } from "@/services/services";
import { ProductPaginationStateProps } from "@/types/other";
import { useDebouncedCallback } from "use-debounce";
import { isEmpty } from "lodash";

export const FoundResultsCount = ({ totalItem }: { totalItem: number }) => {
  return (
    <h6 className="hidden text-base text-default-950 lg:flex">
      {totalItem} Results Found
    </h6>
  );
};

const DishesGrid = ({
  currentPage,
  setTotalItem,
  setCurrentPage,
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
  const CallApiGetListFoodWait = useDebouncedCallback(callApiGetListFood, 200);

  // Sử dụng useEffect để gọi hàm debounce khi có sự thay đổi trong search
  useEffect(() => {
    if (!isEmpty(search)) {
      debouncedCallApiGetListFood();
      setCurrentPage({ page: 1, limit: 10 });
    }
  }, [search]);

  useEffect(() => {
    setTotalItem(listFood?.data?.count);
  }, [listFood?.data?.count]);

  useEffect(() => {
    if (currentPage.page !== 1) {
      callApiGetListFood();
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      await setCurrentPage({ page: 1, limit: 10 });
      CallApiGetListFoodWait();
    };
    fetchData();
  }, [categories, priceRange, rating]);

  return (
    <>
      {listFood?.data?.rows?.map((dish: DishType) => (
        <ProductGridCard key={dish.id} dish={dish} />
      ))}
    </>
  );
};

export default DishesGrid;
