import { Breadcrumb } from "@/components";
import { useSearchParams } from "react-router-dom";
import PaymentSuccess from "./statusPayment/PaymentSuccess";
import PaymentLoading from "./statusPayment/PaymentLoading";
import { useEffect } from "react";
import { useConfirmOrder } from "@/services/services";
import PaymentFail from "./statusPayment/PaymentFail";
import { useDispatch, useSelector } from "react-redux";
import {
  completeBillingInformation,
  getBillingInformation,
} from "@/redux/orderSlice";
import { clearCart } from "@/redux/cartSlice";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const billingInformation = useSelector(getBillingInformation);
  const token = searchParams.get("token");

  const mutationConfirmOrder = useConfirmOrder();

  useEffect(() => {
    if (mutationConfirmOrder.data?.status) {
      dispatch(completeBillingInformation());
      dispatch(clearCart());
    }
  }, [mutationConfirmOrder.data]);

  useEffect(() => {
    if (token) {
      mutationConfirmOrder.mutate({
        ...billingInformation,
        token,
      });
    }
  }, []);

  useEffect(() => {}, []);
  return (
    <>
      <Breadcrumb title="Payment" />
      <section className="py-6 lg:py-16 min-h-[calc(100vh-55vh)]">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-1">
            <div className="lg:col-span-2">
              {mutationConfirmOrder.isPending && <PaymentLoading />}

              {mutationConfirmOrder.isSuccess && <PaymentSuccess />}
              {mutationConfirmOrder.isError && <PaymentFail />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
