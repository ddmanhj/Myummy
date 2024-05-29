import { IdType } from "./other";

export type CategoryType = {
  id: IdType;
  name: string;
  image: string;
};
export type CategoryTypeAPI = {
  id: IdType;
  categoryName: string;
  urlImageCategory: string;
};

export type ReviewType = {
  count: number;
  stars: number;
};

export type SaleType = {
  ends_on: Date;
} & (
  | {
      type: "percent";
      discount: number;
    }
  | {
      type: "amount";
      discount: number;
    }
);

export type DishTypeTemplate = {
  id: IdType;
  category_id: CategoryType["id"];
  category?: CategoryType;
  name: string;
  images: string[];
  tags: string[];
  sale?: SaleType;
  is_popular?: boolean;
  is_new?: boolean;
  price: number;
  review: ReviewType;
  quantity: number;
  type: "veg" | "non-veg" | "eggetarian";
};

export type DishType = {
  id: IdType | any;
  dishesName: string;
  price: number;
  description: string,
  urlImageDishes: string;
  quantity: number;
  reviewStars: number;
  isPopular: boolean;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  saleDiscount: number;
  saleType: string;
  categoryID?: number | any;
  quantityCart?: number;
  unitPrice?: number;
  totalPrice?:number;
}

export type SellerType = {
  id: IdType;
  name: string;
  photo: string;
  contact_no: number;
  email: string;
  location: string;
  order_total: number;
  orders: number;
  joining_date: string;
  joining_time: string;
  status: "active" | "blocked";
};

export type SpecialMenuType = {
  id: number,
  categoryName: string,
  urlImageCategory: string,
}

export type wishlistType = {
  id: IdType,
  wishList: {
    wishList:{
      dishesID: DishType[]
    }
  }
}

export type DataWishListRequest = {
  customerID?: IdType,
  dishesID?: number
}
