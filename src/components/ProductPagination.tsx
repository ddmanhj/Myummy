import { ProductPaginationProps } from "@/types/other";
import { Pagination, PaginationProps } from "antd";

const ProductPagination: React.FC<ProductPaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalItem,
}) => {
  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage((prev) => ({ ...prev, page }));
  };
  return (
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 pt-6 md:flex-nowrap md:justify-end">
      <Pagination
        current={currentPage?.page}
        onChange={onChange}
        total={totalItem}
      />
    </div>
  );
};

export default ProductPagination;
