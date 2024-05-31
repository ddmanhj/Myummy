import { Link } from "react-router-dom";
import { lazy, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { calculatedPrice } from "@/helpers";
import type { DishType } from "@/types/food";
import { Image } from "antd";
import { languageState, readMoneyCurrency } from "@/utils";
const AddToFavouriteButton = lazy(
  () => import("../shopping-interactivity/ProductWishlistToggler")
);
const ProductQuantityToggler = lazy(
  () => import("../shopping-interactivity/ProductQuantityToggler")
);
const AddToCartButton = lazy(
  () => import("../shopping-interactivity/AddToCartButton")
);

const ProductGridCard = ({ dish }: { dish: DishType }) => {
  // const { images, name, review, id } = dish;

  const discountedPrice = calculatedPrice(dish);
  const language = languageState();

  return (
    <div className="order-3 overflow-hidden rounded-lg border border-default-200 p-4 transition-all duration-300 hover:border-primary hover:shadow-xl">
      <div className="group relative divide-y divide-default-200 overflow-hidden rounded-lg">
        <div className="mx-auto mb-4">
          <Image
            width={339}
            height={380}
            // Khi ghép API sẽ là một mảng ảnh
            // src={images[0]}
            src={dish.urlImageDish}
            alt={dish.dishName}
            className="h-full w-full transition-all group-hover:scale-105"
          />
        </div>
        <div className="pt-2">
          <div className="mb-4 flex items-center justify-between">
            <Link
              className="line-clamp-1 text-xl font-semibold text-default-800 after:absolute after:inset-0"
              to={`/dishes/${dish.id}`}
            >
              {dish.dishName}
            </Link>

            <AddToFavouriteButton dish={dish} />
          </div>
          <span className="mb-4 inline-flex items-center gap-2">
            <span className="rounded-full bg-primary p-1">
              <FaStar size={12} className="fill-white text-white" />
            </span>
            <span className="from-inherit text-sm text-default-950">
              {dish.reviewStars}
            </span>
          </span>
          <div className="mb-4 flex items-end justify-between">
            <h4 className="text-2xl font-semibold leading-9 text-default-900">
              {readMoneyCurrency(discountedPrice, language)}
            </h4>

            <ProductQuantityToggler dish={dish} />
          </div>

          <AddToCartButton dish={dish} className="!w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard;
