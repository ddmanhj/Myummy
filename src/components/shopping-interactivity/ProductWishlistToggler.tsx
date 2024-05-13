import { LuHeart } from "react-icons/lu";
import { cn } from "@/utils";
import type { DishType, wishlistType } from "@/types/food";
import { useDispatch, useSelector } from "react-redux";
import { addDishToWishList, deleteDishWishList } from "@/redux/wishListSlice";
import { useAddWishList, useDeleteWishList } from "@/services/services";
import { CustomerType } from "@/types/user";

const ProductWishlistToggler = ({
  dish,
  size,
}: {
  dish: DishType;
  size?: number;
}) => {
  const dispatch = useDispatch();
  const getCustomerData = useSelector(
    (state: CustomerType) => state.customer.customer
  );
  const wishList = useSelector((state: any) => state?.wishList?.dishesID);

  const mutationAddWishList = useAddWishList();
  const mutationDeleteWishList = useDeleteWishList();

  const isInWishlist = (dish: DishType): boolean => {
    return (
      wishList?.find((wishlistDish: any) => wishlistDish?.id == dish?.id) !=
      null
    );
  };

  const toggleToWishlist = async (dish: DishType | any) => {
    if (isInWishlist(dish)) {
      await mutationDeleteWishList.mutate({
        customerID: getCustomerData?.id,
        dishesID: dish?.id,
      });
      dispatch(deleteDishWishList(dish));
    } else {
      await mutationAddWishList.mutate({
        customerID: getCustomerData?.id,
        dishesID: dish?.id,
      });
      dispatch(addDishToWishList(dish));
    }
  };

  return (
    <button onClick={() => toggleToWishlist(dish)}>
      <LuHeart
        size={size ?? 24}
        className={cn(
          "relative z-10 cursor-pointer transition-all",
          isInWishlist(dish)
            ? "fill-red-500 text-red-500"
            : "hover:fill-red-500 hover:text-red-500"
        )}
      />
    </button>
  );
};

export default ProductWishlistToggler;
