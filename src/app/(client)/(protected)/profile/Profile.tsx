import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { customerState } from "@/redux/customerSlice";
import { Avatar } from "antd";
const Profile = ({
  setIsChangeProfile,
}: {
  setIsChangeProfile: React.Dispatch<boolean>;
}) => {
  const { t } = useTranslation();
  const customerData = useSelector(customerState);
  return (
    <>
      <section className="py-6 lg:py-10">
        <div className="container">
          <h4 className="mb-4 text-xl font-medium text-default-900">
            {t("personalDetails")}
          </h4>
          <div className="grid gap-6 xl:grid-cols-5">
            <div className="xl:col-span-1">
              <div className="flex justify-center items-center h-[100%]">
                <Avatar
                  className="xl:mb-40"
                  size={{
                    xs: 80,
                    sm: 100,
                    md: 100,
                    lg: 130,
                    xl: 150,
                    xxl: 200,
                  }}
                  icon={
                    <img
                      src={customerData?.urlImageAvatar}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="xl:col-span-4">
              <div className="grid gap-6 lg:grid-cols-4">
                <div className="col-span-4">
                  <span className="mb-2 block text-sm font-medium text-default-900">
                    {t("fullName")}
                  </span>
                  <div className="block w-full bg-transparent py-2.5 dark:bg-default-50">
                    {customerData?.customerName}
                  </div>
                </div>

                <div className="col-span-2">
                  <span className="mb-2 block text-sm font-medium text-default-900">
                    {t("phone")}
                  </span>
                  <div className="block w-full bg-transparent  py-2.5 dark:bg-default-50">
                    <p>{customerData?.phone}</p>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className="mb-2 block text-sm font-medium text-default-900">
                    {t("email")}
                  </span>
                  <div className="block w-full bg-transparent py-2.5 dark:bg-default-50">
                    {customerData?.email}
                  </div>
                </div>
                <div className="col-span-4">
                  <span className="mb-2 block text-sm font-medium text-default-900">
                    {t("address")}
                  </span>
                  <div className="block w-full py-2.5 dark:bg-default-50">
                    <p>{customerData?.address}</p>
                  </div>
                </div>

                <div className="lg:col-span-1 max-w-full mobile:col-span-4 ">
                  <span className="mb-2 block text-sm font-medium text-default-900">
                    <p>{t("district")}</p>
                  </span>
                  <div className="block w-full py-2.5 dark:bg-default-50">
                    <p>{customerData?.province}</p>
                  </div>
                </div>

                <div className="lg:col-span-1 max-w-full mobile:col-span-4 ">
                  <span className="mb-2 block text-sm font-medium text-default-900">
                    <p>{t("district")}</p>
                  </span>
                  <div className="block w-full py-2.5 dark:bg-default-50">
                    <p>{customerData?.district}</p>
                  </div>
                </div>
                <div className="lg:col-span-1 max-w-full mobile:col-span-4 ">
                  <span className="mb-2 block text-sm font-medium text-default-900">
                    <p>{t("ward")}</p>
                  </span>
                  <div className="block w-full py-2.5 dark:bg-default-50">
                    <p>{customerData?.ward}</p>
                  </div>
                </div>
                <div className="col-span-4 place-self-center">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
                    onClick={() => setIsChangeProfile(true)}
                  >
                    {t("updateProfile")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
