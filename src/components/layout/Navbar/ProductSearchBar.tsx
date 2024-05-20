import { type ChangeEvent, lazy } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { searchFilter, updateSearch } from "@/redux/filterDishSlice";
const FloatingSearchBar = lazy(() => import("./FloatingSearchBar"));

const ProductSearchBar = () => {
  const pagesWithDishes = ["/dishes", "/dishes-list"];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const search = useSelector(searchFilter);

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);
  const dispatch = useDispatch();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearch(e.target.value));
    setTimeout(() => {
      if (!pagesWithDishes.includes(pathname)) {
        navigate(`/dishes? + ${new URLSearchParams(queryParams).toString()}`);
      }
    }, 10);
  };

  return (
    <form>
      <div className="relative w-60">
        <input
          type="search"
          placeholder="Search for items..."
          value={search ?? ""}
          onChange={handleSearch}
          className={
            "form-input w-full rounded-full  border-transparent bg-primary-400/20 px-4 py-1.5 ps-10 placeholder-primary-500 dark:bg-default-50"
          }
        />
        <span className="absolute start-3 top-1/2 -translate-y-1/2">
          <LuSearch className="text-primary-500" />
        </span>
      </div>

      <button className="hidden" type="submit" />
      {createPortal(
        <FloatingSearchBar handleSearch={handleSearch} />,
        document.body
      )}
    </form>
  );
};

export default ProductSearchBar;
