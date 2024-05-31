import { lazy } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LuXCircle } from "react-icons/lu";
import { calculatedPrice } from "@/helpers";
import type { DishType } from "@/types/food";
import { languageState, readMoneyCurrency } from "@/utils";
import { deleteDish } from "@/redux/cartSlice";
const ProductQuantityToggler = lazy(
  () => import("../shopping-interactivity/ProductQuantityToggler")
);

const ShoppingCartCard = ({ dish }: { dish: DishType }) => {
  const { id, dishName, urlImageDish, quantity, unitPrice, totalPrice } = dish;
  const dispatch = useDispatch();
  const language = languageState();

  const discountedPrice = calculatedPrice(dish);

  const handleDeleteDishFromCart = (id: number | any): void => {
    dispatch(deleteDish(id));
  };

  return (
    <tr>
      <td className="whitespace-nowrap px-5 py-3">
        <div className="flex items-center gap-2">
          <button onClick={() => handleDeleteDishFromCart(id)}>
            <LuXCircle size={20} className="text-default-400" />
          </button>
          <img
            // src={images[0]}
            src={urlImageDish}
            width={72}
            height={72}
            className="h-18 w-18"
            alt="onion"
          />
          <Link
            to={`/dishes/${id}`}
            className="text-sm font-medium text-default-800"
          >
            {dishName}
          </Link>
        </div>
      </td>
      <td className="whitespace-nowrap px-5 py-3 text-sm">
        <h4 className="text-base font-semibold text-primary">
          {readMoneyCurrency(unitPrice ?? 0, language)}
          {/* {discountedPrice} */}
        </h4>

        {/* {sale && (
          <h4 className="ms-2 text-sm text-default-500 line-through">
            {currentCurrency}
            {price}
          </h4>
        )} */}
      </td>
      <td className="whitespace-nowrap px-5 py-3">
        <ProductQuantityToggler dish={dish} />
      </td>
      <td className="whitespace-nowrap px-5 py-3 text-center text-sm text-default-800">
        {readMoneyCurrency(totalPrice ?? 0, language)}
        {/* {discountedPrice * quantity} */}
      </td>
    </tr>
  );
};

export default ShoppingCartCard;
