import { LuTrash } from "react-icons/lu";
import { cn } from "@/utils";
import type { DishType } from "@/types/food";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIsInCart,
  decreaseDishQuantity,
  getCurrentQuantityById,
  increaseDIshQuantity,
} from "@/redux/cartSlice";

type ProductQuantityTogglerProps = {
  dish: DishType;
  size?: "small" | "medium";
};

const ProductQuantityToggler = ({
  dish,
  size = "small",
}: ProductQuantityTogglerProps) => {
  const isInCart = useSelector(checkIsInCart(dish));
  const dispatch = useDispatch();
  const quantity = useSelector(getCurrentQuantityById(dish?.id));

  return (
    <div
      className={cn(
        "relative z-10 inline-flex items-center justify-between rounded-full border border-default-200",
        size == "small" ? "p-1" : "p-[5px]",
        { hidden: !isInCart }
      )}
    >
      <button
        onClick={() => dispatch(decreaseDishQuantity(dish?.id))}
        type="button"
        className={cn(
          "inline-flex flex-shrink-0 items-center justify-center rounded-full bg-default-200 text-default-800",
          size == "small" ? "h-6 w-6 text-sm" : "h-8 w-8 text-xl"
        )}
      >
        {quantity < 2 ? <LuTrash className="text-red-500" /> : "–"}
      </button>

      <p className="min-w-[45px] text-center"> {quantity} </p>

      <button
        onClick={() => dispatch(increaseDIshQuantity(dish?.id))}
        type="button"
        className={cn(
          "inline-flex flex-shrink-0 items-center justify-center rounded-full bg-default-200 text-default-800",
          size == "small" ? "h-6 w-6 text-sm" : "h-8 w-8 text-xl"
        )}
      >
        +
      </button>
    </div>
  );
};

export default ProductQuantityToggler;
