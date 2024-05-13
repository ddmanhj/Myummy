import { CategoryType, DishTypeTemplate, RestaurantType } from "./food";
import { IdType } from "./other";

export type WishlistType = DishTypeTemplate;

export type CartTypeTemplate = {
  id: IdType;
  dish_id: IdType;
  dish?: DishTypeTemplate;
  quantity: number;
};

export type CalculatedOrder = {
  total: number;
  totalDiscount: number;
  tax: number;
  orderTotal: number;
};

export type ShoppingState = {
  cartItems: CartTypeTemplate[];
  wishlists: WishlistType[];
  addToCart: (dish: DishTypeTemplate, quantity: number) => void;
  toggleToWishlist: (dish: DishTypeTemplate) => void;
  isInWishlist: (dish: DishTypeTemplate) => boolean;
  isInCart: (dish: DishTypeTemplate) => boolean;
  removeFromCart: (dish: DishTypeTemplate) => void;
  updateQuantityForDish: (dish: DishTypeTemplate, quantity: number) => void;
  getCalculatedOrder: () => CalculatedOrder;
  getCartItemById: (dishId: DishTypeTemplate) => CartTypeTemplate | undefined;
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
