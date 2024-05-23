import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title ?? "Best"} | Myummy</title>
    </Helmet>
  );
};

export default PageTitle;
