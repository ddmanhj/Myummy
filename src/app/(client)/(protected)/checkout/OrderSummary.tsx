import { useSelector } from "react-redux";
import { getCart } from "@/redux/cartSlice";
import { DishType } from "@/types/food";
import { languageState, readMoneyCurrency } from "@/utils";
import { totalCartPrice } from "@/redux/quantityAndTotalItem";

const OrderSummary = () => {
  const cart = useSelector(getCart);
  const language = languageState();
  const totalPrice = useSelector(totalCartPrice);

  return (
    <div className="mb-5">
      <div className="rounded-lg border border-default-200 p-5">
        <h4 className="mb-5 text-lg font-semibold text-default-700">
          Order Summary
        </h4>

        {cart.map((dish: DishType) => {
          return (
            dish && (
              <div key={dish?.id} className="mb-4 flex items-center">
                <img
                  // src={dish.images[0]}
                  src={dish.urlImageDish}
                  height={80}
                  width={80}
                  className="me-2 h-20 w-20"
                  alt={dish.dishName}
                />
                <div>
                  <h4 className="mb-2 text-base font-semibold text-default-700">
                    {dish.dishName}
                  </h4>
                  <h4 className="text-sm text-default-600">
                    {dish.quantityCart} x{" "}
                    <span className="font-semibold text-primary">
                      {readMoneyCurrency(dish?.unitPrice || 0, language)}
                    </span>
                  </h4>
                </div>
              </div>
            )
          );
        })}

        <div className="mb-6">
          <div className="mb-3 flex justify-between">
            <p className="text-sm text-default-500">Sub-total</p>
            <p className="text-sm font-medium text-default-700">
              {readMoneyCurrency(totalPrice, language)}
            </p>
          </div>
          <div className="mb-3 flex justify-between">
            <p className="text-sm text-default-500">Shipping</p>
            <p className="text-sm font-medium text-default-700">Free</p>
          </div>
          <div className="mb-3 flex justify-between">
            <p className="text-sm text-default-500">Discount</p>
            <p className="text-sm font-medium text-default-700">0</p>
          </div>
          <div className="my-4 border-b border-default-200" />
          <div className="mb-3 flex justify-between">
            <p className="text-base text-default-700">Total</p>
            <p className="text-base font-medium text-default-700">
              {readMoneyCurrency(totalPrice, language)}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg border border-primary bg-primary px-10 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-500 hover:bg-primary-500"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
