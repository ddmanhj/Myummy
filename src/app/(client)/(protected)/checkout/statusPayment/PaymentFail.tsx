import { memo } from "react";
import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <>
      <div>
        <div className="flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsjEIIxzib06zbXVLGgo7EMuXnAgKRTZ0eBEhuLMkVg&s" // Đường dẫn tới icon hoặc image của bạn
            alt="Success"
            className="w-[8rem] h-[8rem]"
          />
          <p className="mt-15 text-red-500 text-lg font-semibold">
            Thanh toán thất bại!
          </p>

          <div className="mt-20">
            <Link
              to="/"
              className="w-1/2 rounded-lg bg-primary px-6 py-3 text-base font-medium capitalize text-white transition-all hover:bg-primary-500 lg:w-2/6"
            >
              Go To home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(PaymentFail);
