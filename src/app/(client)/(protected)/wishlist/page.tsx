import { Breadcrumb } from "@/components";
import AllWishList from "./AllWishList";
import { Suspense } from "react";

const Wishlist = () => {
  return (
    <>
      <Breadcrumb title="Wishlist" />
      <section className="py-6 lg:py-10">
        <div className="container">
          <div className="divide-y divide-default-200 overflow-hidden rounded-lg border border-default-200 ">
            <Suspense>
              <AllWishList />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
