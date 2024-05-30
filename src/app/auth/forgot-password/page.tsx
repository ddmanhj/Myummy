import { Link } from "react-router-dom";

import ForgotPasswordForm from "./ForgotPasswordForm";
import { AuthFormLayout, PageTitle } from "@/components";
import { useTranslation } from "react-i18next";

const BottomLink = () => {
  const { t } = useTranslation();
  return (
    <p className="mt-auto text-center text-default-950">
      {t("backTo")}{" "}
      <Link to="/auth/login" className="ms-1 text-primary">
        <span className="font-medium">{t("login")}</span>
      </Link>
    </p>
  );
};

const RecoverPassword = () => {
  const { t } = useTranslation();
  return (
    <AuthFormLayout
      authTitle={t("forgotPassword")}
      helpText={t("descriptionForgotPassword")}
      bottomLink={<BottomLink />}
    >
      <PageTitle title="Recover Password" />
      <ForgotPasswordForm />
    </AuthFormLayout>
  );
};

export default RecoverPassword;
