import { Helmet } from "react-helmet-async"

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title} | Yum Reactjs - Multipurpose Food Tailwind CSS Template</title>
    </Helmet>
  )
}

export default PageTitle