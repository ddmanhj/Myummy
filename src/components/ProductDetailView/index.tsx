import { lazy } from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import { currentCurrency } from "@/common";
import type { DishType } from "@/types/food";
import DishSpecifications from "./DishSpecifications";
import { languageState, readMoneyCurrency } from "@/utils";

const OrderInteraction = lazy(() => import("./OrderInteraction"));

const ProductDetailView = ({
  dish,
  showButtons,
}: {
  dish: DishType;
  showButtons?: boolean;
}) => {
  const {
    dishesName,
    price,
    description,
    reviewCount,
    reviewStars,
    saleDiscount,
    calories,
    fat,
    carbs,
    protein,
  } = dish;
  const convertReviewStars = parseFloat(String(reviewStars));
  const language = languageState();

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-end justify-between font-medium text-default-800 mobile:flex-col mobile:items-start">
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
        <h5 className="text-sm text-default-500">{reviewCount} Reviews</h5>
      </div>
      <p className="mb-4 text-sm text-default-500">{description}</p>
      {showButtons && <OrderInteraction dish={dish} />}
      <div className="mb-6">
        <h4 className="mb-4 text-lg font-medium text-default-700">
          Nutrition Facts{" "}
          <span className="text-sm text-default-400">(per serving)</span>
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
          <span className="font-semibold text-primary">152</span>&nbsp; People
          are viewing this right now
        </h5>
      </div>
    </div>
  );
};

export default ProductDetailView;
