import {
  categoryFilter,
  updateCategory,
  updateSearch,
} from "@/redux/filterDishSlice";
import { useMenu } from "@/services/services";
import { SpecialMenuType } from "@/types/food";
import { Checkbox, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";

const CategoriesFilter = () => {
  const { data: queryMenu } = useMenu();
  const dispatch = useDispatch();
  const listFilterCategory = useSelector(categoryFilter);

  const onChange = (checkedValues: number[]) => {
    dispatch(updateCategory(checkedValues));
    dispatch(updateSearch(""));
  };

  return (
    <div className="relative mb-6 flex flex-col space-y-4">
      <Checkbox.Group onChange={onChange} value={listFilterCategory}>
        <Row>
          {queryMenu?.data?.map((menu: SpecialMenuType) => (
            <Col span={8} className="my-2" key={menu.id}>
              <Checkbox className="text-default-600" value={menu.id}>
                {menu.categoryName}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </div>
  );
};

export default CategoriesFilter;
