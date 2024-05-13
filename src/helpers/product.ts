import type { DishType } from "@/types/food";

export const calculateDiscount = (dish: DishType): number => {
  return dish.saleType == "amount"
    ? dish.saleDiscount
    : dish.saleType  == "percent"
      ? (dish.price / 100) * dish.saleDiscount
      : 0;
};

export const calculatedPrice = (dish: DishType): number => {
  return getPreciseCurrency(dish.price - calculateDiscount(dish));
};

export const getPreciseCurrency = (price: number) => {
  return parseFloat(price.toFixed(2));
};
