import { lazy, useEffect, useState } from "react";
import { BreadcrumbAdmin, OrderDataTable } from "@/components";
import { orderRows } from "../../../(order)/orders/page";
import type { ColumnType } from "@/types/util";
import type { OrderTypeTemplate } from "@/types/other";
import { useNavigate, useParams } from "react-router-dom";
import type { SellerType } from "@/types/food";
const PersonDetailsCard = lazy(
  () => import("@/components/cards/PersonDetailsCard")
);

const CustomerDetails = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  const [seller, setSeller] = useState<SellerType>();

  const columns: Array<ColumnType<OrderTypeTemplate>> = [
    {
      key: "date",
      name: "Date",
    },
    {
      key: "id",
      name: "Order ID",
    },
    {
      key: "dish_id",
      name: "Dish",
    },
    {
      key: "amount",
      name: "Amount",
    },
    {
      key: "status",
      name: "Status",
    },
  ];

  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin
          title="Customers Details"
          link="/admin/customers"
          subtitle="Customers"
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            {seller && <PersonDetailsCard seller={seller} />}
          </div>
          <div className="lg:col-span-2">
            <OrderDataTable<OrderTypeTemplate>
              title="Customer Order history"
              columns={columns}
              rows={orderRows}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
