import { ShoppingCartCard } from "@/components";
import { getCart } from "@/redux/cartSlice";
import type { DishType } from "@/types/food";
import { useSelector } from "react-redux";

const AllCartItems = () => {
  const cart = useSelector(getCart);

  return (
    <>
      {cart?.map((item: DishType) => {
        const dish: DishType | undefined = item;
        return dish && <ShoppingCartCard key={item.id} dish={dish} />;
      })}
    </>
  );
};

export default AllCartItems;
