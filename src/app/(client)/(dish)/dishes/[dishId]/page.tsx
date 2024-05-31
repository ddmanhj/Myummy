import { useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  DishDetailsSwiper,
  DishRatingRepresentation,
  ProductDetailView,
  ProductGridCard,
} from "@/components";
import { useEffect, useState } from "react";
import { DishType } from "@/types/food";
import { useGetDetailFood, useGetListRandomFood } from "@/services/services";
import ConsumerReview from "./ConsumerReview";
import { useTranslation } from "react-i18next";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { dishId } = useParams();
  const [reviewCount, setReviewCount] = useState(0);

  const [dish, setDish] = useState<DishType>();
  const { refetch: callApiGetDetailFood } = useGetDetailFood(Number(dishId));
  const { data: listRandomFood, refetch: callApiGetListRandomFood } =
    useGetListRandomFood();

  useEffect(() => {
    (async () => {
      const foundDish = await callApiGetDetailFood();
      if (!foundDish?.data?.data) {
        navigate("/not-found");
      } else {
        setDish(foundDish?.data?.data);
        callApiGetListRandomFood();
      }
    })();
  }, [dishId]);

  return (
    dish && (
      <>
        <Breadcrumb title={dish.dishName} subtitle="Dishes" link="/dishes" />

        <section className="py-6 lg:py-10">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-2">
              <DishDetailsSwiper images={[]} />

              <ProductDetailView
                dish={dish}
                showButtons
                reviewCount={reviewCount}
              />
            </div>
          </div>
        </section>
        <section className="py-6 lg:py-10">
          <div className="container">
            <h4 className="mb-4 text-xl font-semibold text-default-800">
              {t("youMayAlsoLike")}
            </h4>
            <div className="mb-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {listRandomFood?.data?.map((dish: DishType) => (
                <ProductGridCard key={dish?.id} dish={dish} />
              ))}
            </div>

            {/* <DishRatingRepresentation /> */}

            <div className="pt-10">
              <ConsumerReview setReviewCount={setReviewCount} />
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default ProductDetail;
