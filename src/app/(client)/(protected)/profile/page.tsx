import { Breadcrumb } from "@/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

const ProfileCustomer = () => {
  const { t } = useTranslation();
  const [isChangeProfile, setIsChangeProfile] = useState(false);
  return (
    <>
      <Breadcrumb title={t("profile")} />
      {isChangeProfile ? (
        <EditProfile
          setIsChangeProfile={setIsChangeProfile}
          isChangeProfile={isChangeProfile}
        />
      ) : (
        <Profile setIsChangeProfile={setIsChangeProfile} />
      )}
    </>
  );
};

export default ProfileCustomer;
