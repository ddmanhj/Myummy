import { useState } from "react";
import { Link } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { format } from "date-fns";
import { Breadcrumb, ProductPagination } from "@/components";
import { useGetListOrder } from "@/services/services";
import { useSelector } from "react-redux";
import { customerState } from "@/redux/customerSlice";
import { OrderType } from "@/types/other";
import { useTranslation } from "react-i18next";
import { languageState, readMoneyCurrency } from "@/utils";

const ListOrder = () => {
  const { t } = useTranslation();
  const language = languageState();
  const [currentPage, setCurrentPage] = useState({ page: 1, limit: 9 });
  const dataCustomer = useSelector(customerState);
  const { data: listOrder } = useGetListOrder(
    currentPage.page,
    currentPage.limit,
    dataCustomer?.id
  );

  return (
    <>
      <Breadcrumb title={t("orders")} />
      <section className="py-6 lg:py-16">
        <div className="container">
          <h1 className="mb-6 text-4xl font-medium text-default-800">
            {t("orders")}
          </h1>
          <div className="grid gap-6 lg:grid-cols-3">
            {listOrder?.data?.rows?.map((item: OrderType) => (
              <Link to={`/orders/${item.id}`} key={item.id} state={item}>
                <div className="rounded-lg bg-default-400/10">
                  <div className="py-8 px-5">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                        <RiBillLine
                          size={20}
                          className="fill-white text-primary"
                        />
                      </span>
                      <h4 className="text-lg font-medium text-default-950">
                        {t("orderID")}: {item.id}
                      </h4>
                    </div>

                    <div className="w-full lg:grid-cols-2 lg:flex">
                      <p className="text-sm text-default-500 lg:col-span-1 block w-1/2">
                        {t("totalOrder")}:&nbsp;
                      </p>
                      <p className="text-sm font-bold lg:col-span-1  text-default-700 w-full">
                        {readMoneyCurrency(item.total, language)}
                      </p>
                    </div>

                    <div className="w-full lg:grid-cols-2 lg:flex">
                      <p className="text-sm text-default-500 lg:col-span-1 block w-1/2">
                        {t("phone")}:&nbsp;
                      </p>
                      <p className="text-sm font-medium lg:col-span-1 text-default-700 w-full">
                        {item.phone}
                      </p>
                    </div>

                    <div className="w-full lg:grid-cols-2 lg:flex">
                      <p className="text-sm text-default-500 lg:col-span-1 block w-1/2">
                        {t("orderDate")}:&nbsp;
                      </p>
                      <p className="text-sm font-medium lg:col-span-1 text-default-700 w-full">
                        {format(new Date(item.createdAt), "dd/MM/yyyy - HH:mm")}
                      </p>
                    </div>

                    <div className="w-full lg:grid-cols-2 lg:flex">
                      <p className="text-sm text-default-500 lg:col-span-1 block w-1/2">
                        {t("address")}:&nbsp;
                      </p>
                      <p className="text-sm font-medium lg:col-span-1 text-default-700 w-full">
                        {item.address}
                      </p>
                    </div>

                    <div className="w-full lg:grid-cols-2 lg:flex">
                      <p className="text-sm text-default-500 lg:col-span-1 block w-1/2 ">
                        {t("province")}:&nbsp;
                      </p>
                      <p className="text-sm font-medium lg:col-span-1 text-default-700 w-full">
                        {item.province}
                      </p>
                    </div>

                    <div className="w-full lg:grid-cols-2 lg:flex">
                      <p className="text-sm text-default-500 lg:col-span-1 block w-1/2 ">
                        {t("district")}:&nbsp;
                      </p>
                      <p className="text-sm font-medium lg:col-span-1 text-default-700 w-full">
                        {item.district}
                      </p>
                    </div>
                    <div className="w-full lg:grid-cols-2 lg:flex">
                      <p className="text-sm text-default-500 lg:col-span-1 block w-1/2 ">
                        {t("ward")}:&nbsp;
                      </p>
                      <p className="text-sm font-medium lg:col-span-1 text-default-700 w-full">
                        {item.ward}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {listOrder?.data?.count > 0 && (
            <div className="custom-pagination">
              <ProductPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItem={listOrder?.data?.count}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ListOrder;
