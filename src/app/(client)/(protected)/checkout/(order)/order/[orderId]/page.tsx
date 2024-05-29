import { Breadcrumb } from "@/components";
import OrderSummaryDetail from "../../../OrderSummaryDetail";
import { useEffect, useState } from "react";
import { useGetOrderDetail } from "@/services/services";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isEmpty, isNumber } from "lodash";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

const DetailOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  let { state } = useLocation();
  const { t } = useTranslation();
  const {
    data: OrderDetail,
    refetch: callApiGetOrderDetail,
    isLoading,
  } = useGetOrderDetail(Number(orderId));

  useEffect(() => {
    if (!isEmpty(state)) {
      callApiGetOrderDetail();
    }
    if (isEmpty(OrderDetail?.data) && isEmpty(state)) {
      navigate("/not-found");
    }
  }, [orderId, isLoading]);
  return (
    <>
      <Breadcrumb title="Order detail" subtitle="Orders" link="/orders" />
      <section className="py-6 lg:py-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="col-span-1 lg:col-span-2">
              <div className="mb-8">
                <h1 className="mb-6 text-4xl font-medium text-default-800">
                  {t("orderDetail")}
                </h1>

                <div className="grid gap-6 lg:grid-cols-4">
                  <div className="lg:col-span-4">
                    <span className="mb-2 block text-sm font-medium text-default-900">
                      {t("fullName")}
                    </span>
                    <div className="block w-full bg-transparent py-2.5 dark:bg-default-50">
                      {state?.fullName}
                    </div>
                  </div>

                  <div className="lg:col-span-1 relative">
                    <span className="mb-2 block text-sm font-medium text-default-900">
                      {t("phone")}
                    </span>
                    <div className="block w-full bg-transparent  py-2.5 dark:bg-default-50">
                      <p>{state.phone}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 relative">
                    <span className="mb-2 block text-sm font-medium text-default-900">
                      {t("email")}
                    </span>
                    <div className="block w-full bg-transparent py-2.5 dark:bg-default-50">
                      {state.email}
                    </div>
                  </div>

                  <div className="lg:col-span-1 relative">
                    <span className="mb-2 block text-sm font-medium text-default-900">
                      {t("orderDate")}
                    </span>
                    <div className="block w-full bg-transparent py-2.5 dark:bg-default-50">
                      {format(new Date(state.createdAt), "dd/MM/yyyy - HH:mm")}
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <span className="mb-2 block text-sm font-medium text-default-900">
                      {t("address")}
                    </span>
                    <div className="block w-full py-2.5 dark:bg-default-50">
                      <p>{state.address}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-1 max-w-full">
                    <span className="mb-2 block text-sm font-medium text-default-900">
                      {t("province")}
                    </span>
                    <div className="block w-full py-2.5 dark:bg-default-50">
                      <p>{state.province}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-1 max-w-full">
                    <span className="mb-2 block text-sm font-medium text-default-900">
                      <p>{t("district")}</p>
                    </span>
                    <div className="block w-full py-2.5 dark:bg-default-50">
                      <p>{state.district}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-1 max-w-full">
                    <span className="mb-2 block text-sm font-medium text-default-900">
                      <p>{t("ward")}</p>
                    </span>
                    <div className="block w-full py-2.5 dark:bg-default-50">
                      <p>{state.ward}</p>
                    </div>
                  </div>
                </div>
              </div>

              {!isEmpty(state.message) && (
                <div>
                  <span className="mb-2 block text-sm font-medium text-default-900">
                    {t("messageOrder")}
                  </span>
                  <p>{state.message}</p>
                </div>
              )}
            </div>

            {!!OrderDetail?.data && (
              <OrderSummaryDetail foods={OrderDetail?.data} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailOrder;
