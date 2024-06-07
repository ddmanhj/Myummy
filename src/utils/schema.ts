import i18n from "@/locales/i18n";
import * as yup from "yup";

export const postCommentReviewSchema = yup.object({
    star: yup.number().positive().required("Please select a star rating"),
    review: yup.string().required("Please enter your comment"),
});

export const billingFormSchema = yup.object({
  fullName: yup.string().required(i18n.t("requireFullName")),
    address: yup.string().required("Please enter your address"),
    district: yup.object().nullable().required("Please select your district"),
    ward: yup.object().nullable().required("Please select your State/Province"),
    province: yup.object().nullable().required("Please select your Province"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    phone: yup
      .string()
      .matches(
        /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-4|6-9])\d{7}$/,
        "Số điện thoại không hợp lệ"
      )
      .required("Vui lòng nhập số điện thoại"),
    message: yup.string().optional(),
  });

export const registerFormSchema = yup.object({
    newPassword: yup
      .string()
      .notOneOf(
        [yup.ref("oldPassword")],
        "New password should not be same as current password"
      )
      .required("Please enter your new password"),
    confirmNewPassword: yup
      .string()
      .oneOf(
        [yup.ref("newPassword")],
        "Confirm Password does not match the new Password"
      )
      .required("Please enter your new password again"),
  });

export const personalDetailsFormSchema = yup.object({
    customerName: yup.string().required("Please enter your name"),
    address: yup.string().required("Please enter your address"),
    district: yup.object().nullable().required("Please select your district"),
    ward: yup.object().nullable().required("Please select your State/Province"),
    province: yup.object().nullable().required("Please select your Province"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    phone: yup.string().required("Please enter your Phone"),
  });