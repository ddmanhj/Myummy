import { memo } from "react";
import { useTranslation } from "react-i18next";

const PaymentLoading = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          <img
            src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
            alt="PayPal"
            className="absolute inset-0 m-auto h-16 w-16"
          />
        </div>
      </div>

      <p className="mt-15 flex items-center justify-center text-lg text-default-600 w-full">
        {t("processingPayment")}
      </p>
    </>
  );
};

export default memo(PaymentLoading);
