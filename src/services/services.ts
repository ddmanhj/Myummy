import { useMutation, useQuery } from "@tanstack/react-query";
import { getRequest, notify, postRequest } from "../utils/common";
import { LoginType, RegisterType } from "@/types/user";
import { NavigateFunction } from "react-router-dom";

export const useGetSpecialMenu = () => {
    return useQuery({
      queryKey: ['searchSpecialMenu'],
      enabled: false,
      queryFn: () => getRequest(`/special_menu`),
    });
};

export const useRegisterCustomer = (navigate: NavigateFunction) => {
  return useMutation({
    mutationKey: ['registerCustomer'],
    onSuccess: () => {
      notify('Đăng ký thành công', 'success');
      navigate('/auth/login')
    },
    onError: () => {
      notify('Đăng ký thất bại', 'error');
    },
    mutationFn: (dataCustomer: RegisterType) =>
      postRequest(
        `/auth/register`,
        dataCustomer,
      ),
  });
}

export const useLoginCustomer = () => {
  return useMutation({
    mutationKey: ['registerCustomer'],
    // onSuccess: () => {
    //   notify('Đăng nhập thành công', 'success');
    // },
    // onError: () => {
    //   notify('Đăng nhập thất bại', 'error');
    // },
    mutationFn: (dataCustomer: LoginType) =>
      postRequest(
        `/auth/login`,
        dataCustomer,
      ),
  });
}

export const useLogoutCustomer = () => {
  return useMutation({
    mutationKey: ['registerCustomer'],
    onSuccess: () => {
      notify('Đăng xuất thành công', 'success');
    },
    onError: () => {
      notify('Đăng xuất thất bại', 'error');
    },
    mutationFn: () =>
      getRequest(
        `/auth/logout`,
      ),
  });
}
