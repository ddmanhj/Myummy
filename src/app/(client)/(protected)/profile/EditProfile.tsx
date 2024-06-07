import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalDetailsFormSchema } from "@/utils";
import {
  useEditProfile,
  useGetDistrictList,
  useGetProvinceList,
  useGetWardList,
} from "@/services/services";
import {
  Breadcrumb,
  SelectFormInput,
  TextAreaFormInput,
  TextFormInput,
} from "@/components";
import {
  AddressDistrictType,
  AddressProvinceType,
  AddressWardType,
} from "@/types/other";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import UploadAvatar from "./UploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import { customerState } from "@/redux/customerSlice";

const EditProfile = ({
  isChangeProfile,
  setIsChangeProfile,
}: {
  isChangeProfile: boolean;
  setIsChangeProfile: React.Dispatch<boolean>;
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(personalDetailsFormSchema),
  });
  const customerData = useSelector(customerState);
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState<any>(
    customerData?.urlImageAvatar
      ? { url: customerData?.urlImageAvatar, info: {} }
      : null
  );

  const mutationEditProfile = useEditProfile(dispatch);
  const mutationProvinceList = useGetProvinceList();
  const mutationDistrictList = useGetDistrictList();
  const mutationWardList = useGetWardList();
  useEffect(() => {
    mutationProvinceList.mutate();
  }, []);

  useEffect(() => {
    if (
      !isEmpty(watch("province")) &&
      (watch("province") as { value: string } | undefined)?.value !== "province"
    ) {
      const provinceId = (watch("province") as { value: string })?.value;
      mutationDistrictList.mutate(provinceId);
    }
  }, [watch("province")]);

  useEffect(() => {
    if (
      !isEmpty(watch("district")) &&
      (watch("district") as { value: string } | undefined)?.value !== "district"
    ) {
      const districtId = (watch("district") as unknown as { value: string })
        ?.value;
      mutationWardList.mutate(districtId);
    }
  }, [watch("district")]);

  const handleSubmitForm = (values: any): void => {
    const formData = new FormData();
    formData.append("urlImageAvatar", imageUrl?.info?.originFileObj);
    formData.append("customerID", customerData?.id);
    formData.append("customerName", customerData?.customerName);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("province", values.province?.label);
    formData.append("district", values.district?.label);
    formData.append("ward", values.ward?.label);
    formData.append("defaultUrlImage", customerData?.urlImageAvatar);
    mutationEditProfile.mutate(formData);

    setIsChangeProfile(false);
  };

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
                <UploadAvatar imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>
            <div className="xl:col-span-4">
              <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="grid gap-6 lg:grid-cols-4"
              >
                <div className="col-span-4">
                  <TextFormInput
                    defaultValue={customerData?.customerName}
                    name="customerName"
                    label={t("fullName")}
                    type="text"
                    placeholder="Enter Your First Name"
                    control={control}
                    className="w-[32%]"
                  />
                </div>

                <div className="col-span-2">
                  <TextFormInput
                    defaultValue={customerData?.phone}
                    name="phone"
                    label={t("phone")}
                    type="text"
                    placeholder="Enter Your User Phone"
                    control={control}
                    fullWidth
                  />
                </div>
                <div className="col-span-2">
                  <TextFormInput
                    defaultValue={customerData?.email}
                    name="email"
                    label={t("email")}
                    type="email"
                    placeholder="demoexample@mail.com"
                    control={control}
                    fullWidth
                    disabled
                  />
                </div>
                <div className="col-span-4">
                  <TextAreaFormInput
                    defaultValue={customerData?.address}
                    name="address"
                    label={t("address")}
                    placeholder="Your Address Here..."
                    control={control}
                    fullWidth
                  />
                </div>
                <SelectFormInput
                  defaultValue={{
                    value: "province",
                    label: customerData?.province,
                  }}
                  name="province"
                  label={t("province")}
                  control={control}
                  id="billing-province"
                  instanceId="billing-province"
                  options={mutationProvinceList?.data?.map(
                    (item: AddressProvinceType) => {
                      return {
                        value: item.province_id,
                        label: item.province_name,
                      };
                    }
                  )}
                  fullWidth
                />

                <SelectFormInput
                  defaultValue={{
                    value: "district",
                    label: customerData?.district,
                  }}
                  name="district"
                  label={t("district")}
                  control={control}
                  id="billing-district"
                  instanceId="billing-district"
                  options={mutationDistrictList?.data?.map(
                    (item: AddressDistrictType) => {
                      return {
                        value: item.district_id,
                        label: item.district_name,
                      };
                    }
                  )}
                />
                <SelectFormInput
                  defaultValue={{ value: "ward", label: customerData?.ward }}
                  name="ward"
                  label={t("ward")}
                  control={control}
                  id="billing-ward"
                  instanceId="billing-ward"
                  options={mutationWardList?.data?.map(
                    (item: AddressWardType) => {
                      return { value: item.ward_id, label: item.ward_name };
                    }
                  )}
                />
                <div className="col-span-4 place-self-center flex gap-6">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
                  >
                    {t("save")}
                  </button>
                  {isChangeProfile && (
                    <button
                      className="flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
                      onClick={() => setIsChangeProfile(false)}
                    >
                      {t("cancel")}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
