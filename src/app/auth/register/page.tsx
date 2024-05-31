import { Link } from "react-router-dom";

import { AuthFormLayout, PageTitle } from "@/components";
import RegisterForm from "./RegisterForm";
import { useTranslation } from "react-i18next";

const BottomLink = () => {
  const { t } = useTranslation();
  return (
    <p className="mt-auto text-center text-default-950">
      {t("alreadyHaveAnAccount")}{" "}
      <Link to="/auth/login" className="ms-1 text-primary">
        <span className="font-medium">{t("login")}</span>
      </Link>
    </p>
  );
};

const Register = () => {
  const { t } = useTranslation();
  return (
    <AuthFormLayout
      authTitle={`${t("register")}`}
      helpText={`${t("descriptionRegister")}`}
      bottomLink={<BottomLink />}
      hasThirdPartyAuth
    >
      <PageTitle title="Register" />
      <RegisterForm />
    </AuthFormLayout>
  );
};

export default Register;
