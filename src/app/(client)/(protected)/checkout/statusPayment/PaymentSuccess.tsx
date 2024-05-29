import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex flex-col items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8P_9QIVzvJJRSCnGCnyD9Q3O540PyTmNFwqNQXEVCfQ&s" // Đường dẫn tới icon hoặc image của bạn
          alt="Success"
          className="w-[8rem] h-[8rem]"
        />
        <p className="mt-15 text-green-500 text-lg font-semibold">
          {t("isSuccessOrder")};
        </p>

        <div className="mt-20 flex gap-2">
          <div>
            <Link
              to="/"
              className="w-1/2 rounded-lg bg-primary px-6 py-3 text-base font-medium capitalize text-white transition-all hover:bg-primary-500 lg:w-2/6"
            >
              {t("goToHome")}
            </Link>
          </div>
          <div>
            <Link
              to="/orders"
              className="w-1/2 rounded-lg bg-primary px-6 py-3 text-base font-medium capitalize text-white transition-all hover:bg-primary-500 lg:w-2/6"
            >
              {t("goToOrders")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PaymentSuccess);
