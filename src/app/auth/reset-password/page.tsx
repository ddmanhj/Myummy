// import { Link } from "react-router-dom";
import { AuthFormLayout, PageTitle } from "@/components";
import ResetPasswordForm from "./ResetPasswordForm";
import { useTranslation } from "react-i18next";

// const BottomLink = () => (
//   <p className="mt-auto text-center text-default-950">
//     Back to{" "}
//     <Link to="/auth/login" className="ms-1 text-primary">
//       <span className="font-medium">Login</span>
//     </Link>
//   </p>
// );

const ResetPassword = () => {
  const { t } = useTranslation();
  return (
    <AuthFormLayout
      authTitle={t("resetPassword")}
      helpText={t("createANewStrongPassword")}
      // bottomLink={<BottomLink />}
      hasThirdPartyAuth
    >
      <PageTitle title="Reset Password" />
      <ResetPasswordForm />
    </AuthFormLayout>
  );
};

export default ResetPassword;
