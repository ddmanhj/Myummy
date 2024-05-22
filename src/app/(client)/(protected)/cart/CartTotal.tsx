import { Link } from "react-router-dom";
import { totalCartPrice } from "@/redux/quantityAndTotalItem";
import { useSelector } from "react-redux";
import { languageState, readMoneyCurrency } from "@/utils";

const CartTotal = () => {
  const currentCurrency = useSelector(totalCartPrice);
  const language = languageState();

  return (
    <div className="mb-5 rounded-lg border border-default-200 p-5">
      <h4 className="mb-5 text-lg font-semibold text-default-800">
        Cart Total
      </h4>
      <div className="mb-6">
        <div className="mb-3 flex justify-between">
          <p className="text-sm text-default-500">Sub-total</p>
          <p className="text-sm font-medium text-default-700">
            {readMoneyCurrency(currentCurrency, language)}
          </p>
        </div>
        <div className="mb-3 flex justify-between">
          <p className="text-sm text-default-500">Delivery</p>
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
            {readMoneyCurrency(currentCurrency, language)}
          </p>
        </div>
      </div>
      <Link
        to="/checkout"
        className="inline-flex w-full items-center justify-center rounded-lg border border-primary bg-primary px-10 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-500 hover:bg-primary-500"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartTotal;
