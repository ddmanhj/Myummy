import { lazy, useCallback, useEffect, useRef, useState } from "react";
import openSocket from "socket.io-client";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import type { DishType } from "@/types/food";
import DishSpecifications from "./DishSpecifications";
import { languageState, readMoneyCurrency } from "@/utils";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderInteraction = lazy(() => import("./OrderInteraction"));

interface UpdateViewersPayload {
  dishId: string;
  count: number;
}

const ProductDetailView = ({
  dish,
  showButtons,
  reviewCount,
}: {
  dish: DishType;
  showButtons?: boolean;
  reviewCount?: number;
}) => {
  const {
    dishesName,
    price,
    description,
    reviewStars,
    saleDiscount,
    calories,
    fat,
    carbs,
    protein,
  } = dish;
  const convertReviewStars = parseFloat(String(reviewStars));
  const { t } = useTranslation();
  const language = languageState();
  const { dishId } = useParams();

  const [watchingView, setWatchingView] = useState(0);
  const socketRef = useRef<any>(null);

  if (!socketRef.current) {
    socketRef.current = openSocket(`${import.meta.env.VITE_DOMAIN_BACKEND}`); // Khởi tạo socket chỉ một lần
  }

  const stableSetWatchingView = useCallback(setWatchingView, []);

  useEffect(() => {
    const socket = socketRef.current;

    // Emit sự kiện khi người dùng xem món ăn
    socket.emit("view_item", dishId);

    // Hàm callback để cập nhật số lượng người xem
    const updateViewers = ({ dishId: id, count }: UpdateViewersPayload) => {
      if (id === dishId) {
        stableSetWatchingView(count);
      }
    };

    // Lắng nghe sự kiện update_viewers
    socket.on("update_viewers", updateViewers);

    // Cleanup function để loại bỏ listener khi dishId thay đổi hoặc component unmount
    return () => {
      socket.emit("leave_item", dishId);
      socket.off("update_viewers", updateViewers);
    };
  }, [dishId, stableSetWatchingView]); // Đảm bảo thêm stableSetWatchingView vào dependency array

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between font-medium text-default-800 mobile:flex-col mobile:items-start">
        <h4 className="text-4xl">{dishesName}</h4>
        <h3 className="text-3xl mobile: my-2">
          {readMoneyCurrency(price - saleDiscount, language)}
          {saleDiscount > 0 && (
            <span className="ms-1 text-base text-gray-400 line-through">
              {readMoneyCurrency(price, language)}
            </span>
          )}
        </h3>
      </div>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          {Array.from(new Array(Math.floor(convertReviewStars))).map(
            (_star, idx) => (
              <FaStar key={idx} size={18} className="text-yellow-400" />
            )
          )}
          {!Number.isInteger(convertReviewStars) && (
            <FaStarHalfStroke size={18} className="text-yellow-400" />
          )}
          {convertReviewStars < 5 &&
            Array.from(new Array(5 - Math.ceil(convertReviewStars))).map(
              (_val, idx) => (
                <FaStar key={idx} size={18} className="text-default-400" />
              )
            )}
        </div>
        <div className="h-4 w-px bg-default-400" />
        <h5 className="text-sm text-default-500">
          {reviewCount} {t("reviews")}
        </h5>
      </div>
      <p className="mb-4 text-sm text-default-500">{description}</p>
      {showButtons && <OrderInteraction dish={dish} />}
      <div className="mb-6">
        <h4 className="mb-4 text-lg font-medium text-default-700">
          {t("nutritionFacts")}{" "}
          <span className="text-sm text-default-400">({t("perServing")})</span>
        </h4>
        <DishSpecifications
          calories={calories}
          fat={fat}
          carbs={carbs}
          protein={protein}
        />
      </div>
      <div className="flex items-center">
        <LuEye size={20} className="me-2 text-primary" />
        <h5 className="text-sm text-default-600">
          <span className="font-semibold text-primary">{watchingView}</span>
          &nbsp; {t("viewsWatching")}
        </h5>
      </div>
    </div>
  );
};

export default ProductDetailView;
