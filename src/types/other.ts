import { type IconType } from "react-icons";
import type { DishTypeTemplate } from "./food";

export type IdType = number;

export type StatusType = "paid" | "cancelled" | "refunded";

export type TestimonialType = {
  id: IdType;
  reviewer_name: string;
  reviewer_image: string;
  stars: number;
  review: string;
};

export type SchemaPostCommentReviewType = {
  star: number;
  review: string;
}

export type PostCommentReviewType = {
  id?: number;
  star: number;
  review: string;
  dishID?:number;
  customerID?:number;
  urlImageConsumerReview?: [any];
  image_consumer_reviews?: [any];
  updatedAt?: string;
  createdAt?: string;
  customer?: {
    customerName?: string;
    urlImageAvatar?: string;
  }
}

export type StarRatingProps = {
  maxRating?: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  messages?: string[];
  className?: string;
  onSetRating?: any;
  doneAPI?: boolean;
};

export type StarProps = {
  onRate: any;
  full: boolean;
  onHoverIn: any;
  onHoverOut: any;
  color: string;
  size: number;
};

export type AddressProvinceType = {
  province_id: string,
  province_name: string,
  province_type: string
}

export type AddressDistrictType = {
  district_id: string,
  district_name: string,
}

export type AddressWardType = {
  ward_id: string,
  ward_name: string,
}

export type ProductPaginationProps = {
  currentPage?: CurrentPageType;
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPageType>>;
  totalItem?: number;
  
};
export type ProductPaginationStateProps = {
  currentPage: CurrentPageType;
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPageType>>;
  setTotalItem: React.Dispatch<React.SetStateAction<number>>
};

export type CurrentPageType = {
  page: number;
  limit: number;
  currentPage?: {
    page: number;
    limit: number;
  }
}

export type CardType = {
  id: IdType;
  cardNo: number;
  expiry_date: string;
  card_holder_name: string;
  provider: string;
};

export type LandingDemoType = {
  link: string;
  image: string;
  name: string;
};

export type DemoFeatureType = {
  title: string;
  icon: IconType;
  description: string;
};

export type FrameworkType = {
  name: string;
  icon: string;
};

export type BreadcrumbProps = {
  title: string;
  subtitle?: string;
  link?: string;
};

export type OrderType = {
  id: string;
  date: string;
  dish_id: DishTypeTemplate["id"];
  dish?: DishTypeTemplate;
  amount: DishTypeTemplate["price"];
  status: StatusType;
};

export type TransactionType = {
  asset: string;
  type: "shopping" | "grocery" | "restaurant" | "food";
  date: string;
  status: StatusType;
  amount: number;
};

export type AnalyticsOverviewCardType = {
  name: string;
  amount: number;
  change: string;
};

export type AdminDishTypeTemplate = {
  dish_id: DishTypeTemplate["id"];
  dish?: DishTypeTemplate;
  create_by: string;
  status: "draft" | "published" | "reviewing";
};

export type OrderProgressType = {
  [status: string]: {
    time: string;
    order_id: OrderType["id"];
    order?: OrderType;
  }[];
};

export type NotificationItem = {
  id: number;
  name: string;
  subText: string;
  avatar: string;
  createdAt: Date;
};
