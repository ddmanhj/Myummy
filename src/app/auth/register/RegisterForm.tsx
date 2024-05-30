import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { PasswordFormInput, TextFormInput } from "@/components";
import { RegisterType } from "@/types/user";
import { useRegisterCustomer } from "@/services/services";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const registerFormSchema = yup.object({
    customerName: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
    phone: yup.string().required("Please enter your phone number"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      customerName: "",
      email: "",
      password: "",
    },
  });

  const mutationRegisterCustomer = useRegisterCustomer(navigate);

  const handleSubmitRegister = (data: RegisterType) => {
    mutationRegisterCustomer.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitRegister)}>
      <TextFormInput
        name="customerName"
        control={control}
        type="text"
        className="bg-white"
        placeholder="Enter your name"
        containerClassName="mb-6"
        label="Full Name"
        fullWidth
      />

      <TextFormInput
        name="phone"
        control={control}
        type="text"
        pattern="[0-9]{10}"
        maxLength={10}
        className="bg-white"
        placeholder="Enter your phone"
        containerClassName="mb-6"
        label="Phone"
        fullWidth
      />

      <TextFormInput
        name="email"
        control={control}
        type="email"
        placeholder="Enter your email"
        className="bg-white"
        containerClassName="mb-6"
        label="Email"
        fullWidth
      />

      <PasswordFormInput
        name="password"
        placeholder="Password"
        control={control}
        label="Password"
        containerClassName="mb-6"
        fullWidth
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-500"
      >
        {t("register")}
      </button>
    </form>
  );
};

export default RegisterForm;
