import { useMutation, useQuery } from "@tanstack/react-query";
import { getRequest, notify, postRequest } from "../utils/common";
import { CustomerType, LoginType, RegisterType } from "@/types/user";
import { NavigateFunction } from "react-router-dom";
import { getInfoCustomer } from "@/redux/customerSlice";
import Cookies from "js-cookie";

export const useGetSpecialMenu = () => {
    return useQuery({
      queryKey: ['searchSpecialMenu'],
      enabled: false,
      retry: 1,
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

export const useLoginCustomer = (dispatch: any, redirectAsRole: any) => {
  return useMutation({
    mutationKey: ['loginCustomer'],
    onSuccess: (data) => {
      if(data.status === false) {
        notify(data?.data, 'error');
        return;
      }
      redirectAsRole(data.data.role, true);
      dispatch(getInfoCustomer(data.data))
      Cookies.set('getRefreshToken', data.data?.refreshToken, { expires: 7 });
      notify('Đăng nhập thành công', 'success');
    },
    onError: (err) => {
      console.log(err);
      notify('Đăng nhập thất bại', 'error');
    },
    mutationFn: (dataCustomer: LoginType) =>
      postRequest(
        `/auth/login`,
        dataCustomer,
      ),
  });
}

export const useLogoutCustomer = (id: number) => {
  return useMutation({
    mutationKey: ['logOutCustomer'],
    onSuccess: () => {
      notify('Đăng xuất thành công', 'success');
    },
    onError: () => {
      notify('Đăng xuất thất bại', 'error');
    },
    mutationFn: () =>
      postRequest(
        `/auth/logout`,
        {id: id}
      ),
  });
}
