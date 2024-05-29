import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductWishListCard } from "@/components";
import { emptyWishlistImg } from "@/assets/data";
import { CustomerType } from "@/types/user";
import { useGetDishByWishList } from "@/services/services";
import { useEffect } from "react";
import { DishType } from "@/types/food";
import { isEmpty } from "lodash";

const AllWishList = () => {
  const dispatch = useDispatch();
  const getCustomerData = useSelector(
    (state: CustomerType) => state.customer.customer
  );

  const mutationGetDishByWishList = useGetDishByWishList(dispatch);

  useEffect(() => {
    mutationGetDishByWishList.mutate(getCustomerData?.id);
  }, []);

  return !isEmpty(mutationGetDishByWishList?.data?.data) ? (
    <>
      {mutationGetDishByWishList?.data?.data?.map((dish: DishType) => (
        <ProductWishListCard key={dish.id} dish={dish} />
      ))}
    </>
  ) : (
    !mutationGetDishByWishList.isPending && (
      <div className="flex flex-col items-center justify-center p-10">
        <p className="text-3xl my-5">Opps...! Empty wish list🥺</p>
        <img
          src={emptyWishlistImg}
          width={250}
          height={250}
          alt="not-found-image"
          className="h-full max-w-full"
        />
        <Link
          to="/dishes"
          className="rounded-lg bg-primary px-6 py-3 text-base font-medium capitalize text-white transition-all hover:bg-primary-500 mx-auto inline-block my-5"
        >
          Check Products
        </Link>
      </div>
    )
  );
};

export default AllWishList;
