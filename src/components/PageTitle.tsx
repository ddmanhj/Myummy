import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title} | Myummy</title>
    </Helmet>
  );
};

export default PageTitle;
