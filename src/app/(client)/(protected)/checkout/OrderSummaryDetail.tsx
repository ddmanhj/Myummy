import { languageState, readMoneyCurrency } from "@/utils";
import { OrderDetailType } from "@/types/other";
import { useTranslation } from "react-i18next";

const OrderSummary = ({ foods }: { foods: OrderDetailType[] }) => {
  const { t } = useTranslation();
  const language = languageState();

  return (
    <div className="mb-5">
      <div className="rounded-lg border border-default-200 p-5">
        <h4 className="mb-5 text-lg font-semibold text-default-700">
          {t("orderSummary")}
        </h4>

        {foods?.map((orderItem: OrderDetailType) => {
          return (
            orderItem && (
              <div key={orderItem?.id} className="mb-4 flex items-center">
                <img
                  // src={dish.images[0]}
                  src={orderItem?.dish.urlImageDish}
                  height={80}
                  width={80}
                  className="me-2 h-20 w-20"
                  alt={orderItem?.dish.dishName}
                />
                <div>
                  <h4 className="mb-2 text-base font-semibold text-default-700">
                    {orderItem?.dish.dishName}
                  </h4>
                  <h4 className="text-sm text-default-600">
                    {orderItem.quantity} x{" "}
                    <span className="font-semibold text-primary">
                      {readMoneyCurrency(orderItem?.dish?.price || 0, language)}
                    </span>
                  </h4>
                </div>
              </div>
            )
          );
        })}

        <div className="mb-6">
          <div className="mb-3 flex justify-between">
            <p className="text-sm text-default-500">{t("subTotal")}</p>
            <p className="text-sm font-medium text-default-700">
              {readMoneyCurrency(foods[0]?.subTotal, language)}
            </p>
          </div>
          <div className="mb-3 flex justify-between">
            <p className="text-sm text-default-500">{t("discount")}</p>
            <p className="text-sm font-medium text-default-700">0</p>
          </div>
          <div className="my-4 border-b border-default-200" />
          <div className="mb-3 flex justify-between">
            <p className="text-base text-default-700">Total</p>
            <p className="text-base font-medium text-default-700">
              {readMoneyCurrency(foods[0]?.total, language)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
