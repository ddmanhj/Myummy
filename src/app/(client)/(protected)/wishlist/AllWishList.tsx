import { Link } from "react-router-dom";
import { useShoppingContext } from "@/context";
import { ProductWishListCard } from "@/components";
import { error404OtherImg } from "@/assets/data";
import { emptyWishlistImg } from "@/assets/data";

const AllWishList = () => {
  const { wishlists } = useShoppingContext();
  return !!wishlists.length ? (
    <>
      {wishlists.map((dish) => (
        <ProductWishListCard key={dish.id} dish={dish} />
      ))}
    </>
  ) : (
    <div className="flex flex-col items-center justify-center p-10">
      <p className="text-3xl my-5">Opps...! Empty wish list🥺</p>
      <img
        src={emptyWishlistImg}
        width={250}
        height={250}
        alt="not-found-image"
        className="h-full max-w-full"
      />
      <Link
        to="/dishes"
        className="rounded-lg bg-primary px-6 py-3 text-base font-medium capitalize text-white transition-all hover:bg-primary-500 mx-auto inline-block my-5"
      >
        Check Products
      </Link>
    </div>
  );
};

export default AllWishList;
