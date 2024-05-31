import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import { personalDetailsFormSchema } from "@/utils";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import {
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

// styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {
  AddressDistrictType,
  AddressProvinceType,
  AddressWardType,
} from "@/types/other";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop
);

const ProfileCustomer = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(personalDetailsFormSchema),
  });

  const mutationProvinceList = useGetProvinceList();
  const mutationDistrictList = useGetDistrictList();
  const mutationWardList = useGetWardList();
  useEffect(() => {
    mutationProvinceList.mutate();
  }, []);

  useEffect(() => {
    if (!isEmpty(watch("province"))) {
      const provinceId = (watch("province") as unknown as { value: string })
        ?.value;
      mutationDistrictList.mutate(provinceId);
    }
  }, [watch("province")]);

  useEffect(() => {
    if (!isEmpty(watch("district"))) {
      const districtId = (watch("district") as unknown as { value: string })
        ?.value;
      mutationWardList.mutate(districtId);
    }
  }, [watch("district")]);

  return (
    <>
      <Breadcrumb title="Profile" />
      <section className="py-6 lg:py-10">
        <div className="container">
          <h4 className="mb-4 text-xl font-medium text-default-900">
            Personal Details
          </h4>
          <div className="grid gap-6 xl:grid-cols-5">
            <div className="xl:col-span-1">
              <div className="mx-auto">
                <FilePond
                  className="mx-auto h-44 w-44 lg:h-48 lg:w-48"
                  allowReplace={true} // Cho phép thay thế ảnh hiện tại
                  labelIdle="Add Photo"
                  imagePreviewHeight={110}
                  imageCropAspectRatio="1:1"
                  stylePanelLayout="compact circle"
                  styleButtonRemoveItemPosition="center bottom"
                />
                {/* <UploadAvatar /> */}
              </div>
            </div>
            <div className="xl:col-span-4">
              <form
                onSubmit={handleSubmit(() => {})}
                className="grid gap-6 lg:grid-cols-4"
              >
                <div className="col-span-4">
                  <TextFormInput
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
                    name="email"
                    label={t("email")}
                    type="email"
                    placeholder="demoexample@mail.com"
                    control={control}
                    fullWidth
                  />
                </div>
                <div className="col-span-4">
                  <TextAreaFormInput
                    name="address"
                    label={t("address")}
                    placeholder="Your Address Here..."
                    control={control}
                    fullWidth
                  />
                </div>
                <SelectFormInput
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
                <div className="col-span-4 place-self-center">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileCustomer;
