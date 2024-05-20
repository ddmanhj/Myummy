import { sleep } from "@/utils";
import { calculatedPrice } from "./product";
import {
  categoriesData,
  dishesData,
  orderHistoryData,
  sellersData,
} from "@/assets/data";
import type { CategoryType, DishType } from "@/types/food";
import type { OrderType } from "@/types/other";
import type { FilterState } from "../types/state";

export const getFilteredProducts = (
  filter: Pick<
    FilterState,
    "categories"  | "minPrice" | "maxPrice" | "rating" | "search"
  >,
): DishType[] => {
  const products: DishType[] = [];
  filter = filter ?? {};
  return products.filter((dish) => {
    return !(
      (filter.categories &&
        !!filter.categories.length &&
        !filter.categories.includes(dish?.categoryID)) ||
      (filter.minPrice && !(calculatedPrice(dish) >= filter.minPrice)) ||
      (filter.maxPrice && !(calculatedPrice(dish) <= filter.maxPrice)) ||
      (filter.search &&
        !dish.dishesName.toLowerCase().includes(filter.search.toLowerCase())) ||
      (filter.rating && !(dish.reviewStars >= filter.rating))
    );
  });
};

export const getAllDishes = async () => {
  // You can fetch your products from your server here
  await sleep(200);
  return dishesData;
};

export const getAllCategories = async () => {
  // You can fetch data from your server here
  await sleep(200);
  return categoriesData;
};

export const getAllSellers = async () => {
  // You can fetch data from your server here
  await sleep(200);
  return sellersData;
};

export const getAllOrders = async () => {
  await sleep(200);
  return orderHistoryData;
};

export const getDishById = async (id: DishType["id"]) => {
  // You can fetch data from your server here
  await sleep(200);
  const dish = dishesData.find((dish) => dish.id == id);
  return dish;
};

export const getCategoryById = async (id: CategoryType["id"]) => {
  // You can fetch data from your server here
  await sleep(200);
  return categoriesData.find((category) => category.id == id);
};

export const getOrderById = async (id: OrderType["id"]) => {
  // You can fetch data from your server here
  await sleep(200);
  return orderHistoryData.find((order) => order.id == id);
};

export const getOrderHistoryById = async (id: OrderType["id"]) => {
  // You can fetch data from your server here
  await sleep(200);
  return orderHistoryData.find((order) => order.id == id);
};
