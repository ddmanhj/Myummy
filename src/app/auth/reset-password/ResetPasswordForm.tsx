import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { PasswordFormInput } from "@/components";
import { registerFormSchema } from "@/utils";

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(() => null)}>
      <PasswordFormInput
        name="newPassword"
        control={control}
        label={t("newPassword")}
        labelClassName="block text-sm font-medium text-default-900 mb-2"
        containerClassName="mb-6"
        fullWidth
      />

      <PasswordFormInput
        name="confirmNewPassword"
        control={control}
        label={t("confirmNewPassword")}
        labelClassName="block text-sm font-medium text-default-900 mb-2"
        containerClassName="mb-6"
        fullWidth
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-500"
      >
        {t("resetPassword")}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
