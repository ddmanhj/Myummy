import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SelectFormInput,
  TextAreaFormInput,
  TextFormInput,
} from "@/components";
import OrderSummary from "./OrderSummary";
import {
  useGetDistrictList,
  useGetProvinceList,
  useGetWardList,
} from "@/services/services";
import {
  AddressDistrictType,
  AddressProvinceType,
  AddressWardType,
} from "@/types/other";
import { isEmpty } from "lodash";
import { billingFormSchema } from "@/utils";

const BillingInformation = () => {
  const mutationProvinceList = useGetProvinceList();
  const mutationDistrictList = useGetDistrictList();
  const mutationWardList = useGetWardList();
  useEffect(() => {
    mutationProvinceList.mutate();
  }, []);

  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(billingFormSchema),
  });

  const handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    // Chỉ cho phép các phím số, phím xóa, phím mũi tên, và phím tab
    if (
      !/[0-9]/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Tab"
    ) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (!isEmpty(watch("province"))) {
      const provinceId = (watch("province") as { value: string })?.value;
      mutationDistrictList.mutate(provinceId);
    }
  }, [watch("province")]);

  useEffect(() => {
    if (!isEmpty(watch("district"))) {
      const districtId = (watch("district") as { value: string })?.value;
      mutationWardList.mutate(districtId);
    }
  }, [watch("district")]);

  const handleSubmitForm = () => {};

  return (
    <form
      onSubmit={handleSubmit(() => handleSubmitForm)}
      className="grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      <div className="col-span-1 lg:col-span-2">
        <div className="mb-8">
          <h4 className="mb-6 text-lg font-medium text-default-800">
            Billing Information
          </h4>
          <div className="grid gap-6 lg:grid-cols-4">
            <TextFormInput
              name="customerName"
              type="text"
              label="Full Name"
              placeholder="Full Name"
              containerClassName="lg:col-span-2"
              control={control}
              fullWidth
            />

            <TextAreaFormInput
              name="address"
              label="Address"
              placeholder="Enter Your Address"
              containerClassName="lg:col-span-4"
              control={control}
              fullWidth
            />

            <SelectFormInput
              name="province"
              label="Province"
              control={control}
              id="billing-province"
              instanceId="billing-province"
              options={mutationProvinceList?.data?.map(
                (item: AddressProvinceType) => {
                  return { value: item.province_id, label: item.province_name };
                }
              )}
            />

            <SelectFormInput
              name="district"
              label="District"
              control={control}
              id="billing-district"
              instanceId="billing-district"
              options={mutationDistrictList?.data?.map(
                (item: AddressDistrictType) => {
                  return { value: item.district_id, label: item.district_name };
                }
              )}
            />

            <SelectFormInput
              name="ward"
              label="Ward"
              control={control}
              id="billing-ward"
              instanceId="billing-ward"
              options={mutationWardList?.data?.map((item: AddressWardType) => {
                return { value: item.ward_id, label: item.ward_name };
              })}
            />

            <TextFormInput
              name="email"
              type="text"
              label="Email"
              className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
              placeholder="example@example.com"
              containerClassName="lg:col-span-2"
              control={control}
            />

            <TextFormInput
              name="phoneNo"
              type="tel"
              label="Phone Number"
              className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
              placeholder="Number phone"
              containerClassName="lg:col-span-2"
              control={control}
              maxLength={10}
              inputMode="numeric"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div>
          <TextAreaFormInput
            name="message"
            label="Message (optional)"
            placeholder="Notes about your order, e.g. special notes for delivery"
            control={control}
            fullWidth
          />
        </div>
      </div>

      <OrderSummary />
    </form>
  );
};

export default BillingInformation;
