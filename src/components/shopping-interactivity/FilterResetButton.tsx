import { resetFilter } from "@/redux/filterDishSlice";
import { ProductPaginationProps } from "@/types/other";
import { useDispatch } from "react-redux";

const FilterResetButton = ({ setCurrentPage }: ProductPaginationProps) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(resetFilter());
        setCurrentPage({ page: 1, limit: 10 });
      }}
      type="reset"
      className="inline-flex w-full items-center justify-center rounded border border-primary bg-primary px-6 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary focus:ring focus:ring-primary/50"
    >
      Reset filter
    </button>
  );
};

export default FilterResetButton;
