import { cn, languageState } from "@/utils";
import { LuShoppingCart, LuTrash } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { addDish, deleteDish, checkIsInCart } from "@/redux/cartSlice";
import { DishType } from "@/types/food";
import { useTranslation } from "react-i18next";

export type PropsAddToCartButton = {
  dish?: DishType | any;
  className?: string;
};

const AddToCartButton = ({ dish, className }: PropsAddToCartButton) => {
  const { t } = useTranslation();
  const language = languageState();
  const dispatch = useDispatch();
  const isInCart = useSelector(checkIsInCart(dish));

  function handleAddToCard(dish: DishType): void {
    const newItem: any = {
      id: dish.id,
      dishesName: dish.dishesName,
      urlImageDishes: dish.urlImageDishes,
      quantityCart: 1,
      unitPrice: dish.price,
      totalPrice: dish.price * 1,
    };
    dispatch(addDish(newItem));
  }

  return isInCart ? (
    <button
      className={cn(
        "relative z-10 inline-flex w-full items-center justify-center rounded-lg bg-red-500/20 px-6 py-3 text-center text-sm font-medium text-red-500 shadow-sm transition-all duration-300 hover:bg-red-500 hover:text-white lg:w-auto",
        className
      )}
      onClick={() => dispatch(deleteDish(dish?.id))}
    >
      <LuTrash size={18} className="me-2" />
      <span className="line-clamp-1">{t("removeFromCart")}</span>
    </button>
  ) : (
    <button
      className={cn(
        "relative z-10 inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-primary-500 lg:w-auto",
        className
      )}
      onClick={() => dish && handleAddToCard(dish)}
    >
      <LuShoppingCart size={18} className="me-2" />
      {t("addToCart")}
    </button>
  );
};

export default AddToCartButton;
