import { languageState } from "@/redux/customerSlice";
import { totalCartPrice } from "@/redux/quantityAndTotalItem";
import { readMoneyCurrency } from "@/utils";
import { useSelector } from "react-redux";

const CardItemTotal = () => {
  const totalPrice = useSelector(totalCartPrice);
  const language = useSelector(languageState);

  return <p>{readMoneyCurrency(totalPrice, language)}</p>;
};

export default CardItemTotal;
