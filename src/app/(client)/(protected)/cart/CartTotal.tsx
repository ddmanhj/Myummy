import { Link } from "react-router-dom";
import { totalCartPrice } from "@/redux/quantityAndTotalItem";
import { useSelector } from "react-redux";
import { languageState, readMoneyCurrency } from "@/utils";
import { useTranslation } from "react-i18next";
import { getCart } from "@/redux/cartSlice";

const CartTotal = () => {
  const { t } = useTranslation();
  const currentCurrency = useSelector(totalCartPrice);
  const language = languageState();
  const cart = useSelector(getCart);
  console.log("🚀 ~ CartTotal ~ cart:", cart);

  return (
    <div className="mb-5 rounded-lg border border-default-200 p-5">
      <h4 className="mb-5 text-lg font-semibold text-default-800">
        {t("cartTotal")}
      </h4>
      <div className="mb-6">
        <div className="mb-3 flex justify-between">
          <p className="text-sm text-default-500">{t("subTotal")}</p>
          <p className="text-sm font-medium text-default-700">
            {readMoneyCurrency(currentCurrency, language)}
          </p>
        </div>
        <div className="mb-3 flex justify-between">
          <p className="text-sm text-default-500">{t("discount")}</p>
          <p className="text-sm font-medium text-default-700">0</p>
        </div>
        <div className="my-4 border-b border-default-200" />
        <div className="mb-3 flex justify-between">
          <p className="text-base text-default-700">{t("totalOrder")}</p>
          <p className="text-base font-medium text-default-700">
            {readMoneyCurrency(currentCurrency, language)}
          </p>
        </div>
      </div>
      <Link
        to={cart.length > 0 ? "/checkout" : ""}
        className={`inline-flex w-full items-center justify-center rounded-lg border px-10 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-500 ${cart.length > 0 ? "border-primary bg-primary hover:bg-primary-500" : "cursor-not-allowed border-primary-300 bg-primary-300 hover:bg-primary-250"}`}
      >
        {t("proceedToCheckout")}
      </Link>
    </div>
  );
};

export default CartTotal;
