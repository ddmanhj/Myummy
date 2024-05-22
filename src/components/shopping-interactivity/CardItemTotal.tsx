import { totalCartPrice } from "@/redux/quantityAndTotalItem";
import { languageState, readMoneyCurrency } from "@/utils";
import { useSelector } from "react-redux";

const CardItemTotal = () => {
  const totalPrice = useSelector(totalCartPrice);
  const language = languageState();

  return <p>{readMoneyCurrency(totalPrice, language)}</p>;
};

export default CardItemTotal;
