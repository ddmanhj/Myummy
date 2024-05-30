import { CategoryType, DishTypeTemplate } from "./food";
import { IdType } from "./other";

export type WishlistType = DishTypeTemplate;

export type CartTypeTemplate = {
  id: IdType;
  dish_id: IdType;
  dish?: DishTypeTemplate;
  quantity: number;
};
export type CartType = {
  dishName: string;
  id: IdType;
  quantityCart: number;
  totalPrice: number;
  unitPrice: number;
  urlImageDish: string;
  quantity?: number;
}

export type CalculatedOrder = {
  total: number;
  totalDiscount: number;
  tax: number;
  orderTotal: number;
};

export type FilterState = {
  categories: Array<CategoryType["id"]>;
  search: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  rating: number | undefined;
  updateCategory: (categoryId: CategoryType["id"]) => void;
  updateSearch: (search: string) => void;
  updateMinPrice: (minPrice: number) => void;
  updateMaxPrice: (maxPrice: number) => void;
  updateRating: (rating: number) => void;
};
