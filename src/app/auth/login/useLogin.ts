import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useLoginCustomer } from "@/services/services";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerData = useSelector((state: any) => state.customer.customer)
  const getSessionCustomer = Cookies.get("getRefreshToken");

  const [searchParams] = useSearchParams();

  const loginFormSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "user@coderthemes.com",
      password: "password",
    },
  });

  useEffect(() => {
    if (customerData?.role) {
      redirectAsRole(customerData?.role);
    }
  }, []);

  const redirectAsRole = (role: "admin" | "customer", current = false) => {
    const redirectLink = searchParams.get("redirectTo");
    const adminRoute = redirectLink?.startsWith("/admin");

    if (customerData?.role == "admin" && !isEmpty(getSessionCustomer) && !(redirectLink && !adminRoute)) {
      navigate(redirectLink && adminRoute ? redirectLink : "/admin/dashboard");
      return;
    } else if (customerData?.role == "customer" && !isEmpty(getSessionCustomer)  && !(redirectLink && adminRoute)) {
      navigate(redirectLink && !adminRoute ? redirectLink : "/");
      return;
    }

    if (current) {
      if (role == "admin") {
        navigate("/admin/dashboard");
      } else if (role == "customer") {
        navigate(redirectLink && !adminRoute ? redirectLink : "/");
      }
    }
  };

  const mutationLoginCustomer = useLoginCustomer(dispatch, redirectAsRole);
  type LoginFormFields = yup.InferType<typeof loginFormSchema>
  const login = handleSubmit(async (values: LoginFormFields) => {
    mutationLoginCustomer.isPending && setLoading(true);
    await mutationLoginCustomer.mutate(values);
  });

  return { loading,login, control };
};

export default useLogin;
