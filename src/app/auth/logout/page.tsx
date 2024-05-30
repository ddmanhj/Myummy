import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthFormLayout, PageTitle } from "@/components";
// import { useAuthContext } from "@/context";

const BottomLink = () => {
  const { t } = useTranslation();
  return (
    <p className="mt-auto text-center text-default-950">
      {t("pleaseComeBackAnd")}
      <Link to="/auth/login" className="ms-1 text-primary">
        <span className="font-medium">{t("login")}</span>
      </Link>
    </p>
  );
};

const Logout = () => {
  const { t } = useTranslation();
  return (
    <AuthFormLayout
      authTitle={`${t("logOut")}`}
      helpText={`${t("descriptionLogout")}`}
      bottomLink={<BottomLink />}
    >
      <PageTitle title={t("logOut")} />
      <div></div>
    </AuthFormLayout>
  );
};

export default Logout;
