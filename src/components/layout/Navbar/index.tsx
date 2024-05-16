import { lazy } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  LuHeart,
  LuLogOut,
  LuMenu,
  LuSearch,
  LuShoppingCart,
  LuUser,
  LuUserCircle,
} from "react-icons/lu";
import SimplebarReactClient from "../../SimplebarReactClient";
import TabNavigation from "./TabNavigation";
import VerticalMenu from "./VerticalMenu";
// import { OfferAdBanner } from "../../index";
import { logoDarkImg, logoLightImg, logoMyummy } from "@/assets/data/images";
import { getClientVerticalMenuItems, getHorizontalMenuItems } from "@/helpers";
import ProductSearchBar from "./ProductSearchBar";
import CartAndWishList from "./CartAndWishList";
import { Link, useNavigate } from "react-router-dom";
const HorizontalMenu = lazy(() => import("./HorizontalMenu"));
const StickyHeader = lazy(() => import("../../StickyHeader"));
const Language = lazy(() => import("./Language"));
import { useLogoutCustomer } from "@/services/services";
import { customerLogOut } from "@/redux/customerSlice";
import { CustomerType } from "@/types/user";
import { resetWishList } from "@/redux/wishListSlice";
import { clearCart } from "@/redux/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCustomerData = useSelector(
    (state: CustomerType) => state.customer.customer
  );
  const mutationLogOutCustomer = useLogoutCustomer(getCustomerData.id);
  const logOutHandle = async () => {
    await mutationLogOutCustomer.mutate();
    Cookies.remove("getRefreshToken");
    Cookies.remove("newAccessToken");
    dispatch(customerLogOut());
    dispatch(resetWishList());
    dispatch(clearCart());
    navigate("/auth/logout");
  };

  return (
    <>
      {/* <OfferAdBanner /> */}

      <StickyHeader>
        <div className="flex h-14 items-center lg:h-20">
          <div className="container">
            <div className="grid grid-cols-2 items-center gap-4 lg:grid-cols-3">
              <div className="flex">
                <button
                  className="block lg:hidden "
                  data-hs-overlay="#mobile-menu"
                >
                  <LuMenu
                    size={28}
                    className="me-4 text-default-600 hover:text-primary"
                  />
                </button>

                <Link to="/">
                  <img
                    src={logoMyummy}
                    height={50}
                    width={120}
                    alt="logo"
                    className="flex h-20 w-20 dark:hidden mobile:h-10 mobile:w-10"
                  />
                  <img
                    src={logoMyummy}
                    height={50}
                    width={120}
                    alt="logo"
                    className="hidden h-20 w-20 dark:flex"
                  />
                </Link>

                <ul className="flex items-center gap-x-6 ml-5 mobile:ml-2">
                  <li className="menu-item relative hidden xl:flex">
                    <ProductSearchBar />
                  </li>

                  <li className="menu-item flex xl:hidden">
                    <button
                      data-hs-overlay="#mobileSearchSidebar"
                      className="relative flex text-base text-default-600 transition-all hover:text-primary"
                    >
                      <LuSearch size={20} />
                    </button>
                  </li>
                </ul>
              </div>

              <HorizontalMenu menuItems={getHorizontalMenuItems()} />

              <ul className="flex items-center justify-end gap-x-6">
                <CartAndWishList />

                <li className="menu-item flex">
                  <div className="hs-dropdown relative inline-flex [--placement:bottom] [--trigger:hover]">
                    <div className="hs-dropdown-toggle relative flex cursor-pointer items-center text-base text-default-600 transition-all after:absolute after:inset-0 hover:text-primary hover:after:-bottom-10">
                      <LuUser size={20} />
                    </div>
                    <div className="hs-dropdown-menu z-20 mt-4 hidden min-w-[200px] rounded-lg border border-default-100 bg-white p-1.5 opacity-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
                      <ul className="flex flex-col gap-1">
                        <li>
                          <Link
                            className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                            to="/admin/profile"
                            target="_blank"
                          >
                            <LuUserCircle size={16} /> Admin
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                            to="/cart"
                          >
                            <LuShoppingCart size={16} />
                            Cart
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                            to="/wishlist"
                          >
                            <LuHeart size={16} />
                            Wishlist
                          </Link>
                        </li>
                        <li>
                          <span
                            onClick={logOutHandle}
                            className="flex w-full items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700 cursor-pointer"
                          >
                            <LuLogOut size={16} />
                            Log Out
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li className="menu-item flex mobile:mr-5">
                  <Language />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </StickyHeader>

      <TabNavigation />

      <div
        id="mobile-menu"
        className="hs-overlay fixed left-0 top-0 z-60 hidden h-full w-full max-w-[270px] -translate-x-full transform border-r border-default-200  bg-white transition-all hs-overlay-open:translate-x-0 dark:bg-default-50"
        tabIndex={-1}
      >
        <div className="flex h-16 items-center justify-center border-b border-dashed border-default-200 transition-all duration-300">
          <Link to="/">
            <img
              src={logoDarkImg}
              width={130}
              height={40}
              alt="logo"
              className="flex h-10 dark:hidden"
            />
            <img
              src={logoLightImg}
              width={130}
              height={40}
              alt="logo"
              className="hidden h-10 dark:flex"
            />
          </Link>
        </div>
        <SimplebarReactClient className="h-[calc(100%-4rem)]">
          <nav className="hs-accordion-group flex w-full flex-col flex-wrap p-4">
            <VerticalMenu menuItems={getClientVerticalMenuItems()} />
          </nav>
        </SimplebarReactClient>
      </div>
    </>
  );
};

export default Navbar;
