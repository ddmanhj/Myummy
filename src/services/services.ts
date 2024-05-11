import { useMutation, useQuery } from "@tanstack/react-query";
import { getRequest, notify, postRequest } from "../utils/common";
import { LoginType, RegisterType } from "@/types/user";
import { NavigateFunction } from "react-router-dom";
import { getInfoCustomer } from "@/redux/customerSlice";
import Cookies from "js-cookie";
import { DataWishListRequest } from "@/types/food";
import { getWishListAPI } from "@/redux/wishListSlice";

// Menu
export const useMenu = () => {
    return useQuery({
      queryKey: ['menu'],
      enabled: true,
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnMount: false, // Không gọi lại khi mount lại
      queryFn: () => getRequest(`/menu`),
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

// END Auth Menu

// Auth Login
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
      dispatch(getWishListAPI(data?.data?.wishList));
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

// END Auth Login

// Food
export const useGetListFoodSpecialMenu = (idSpecialMenu: number) => {
  return useQuery({
    queryKey: ['listFoodSpecialMenu'],
    enabled: true,
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: () => getRequest(`/special_menu/${idSpecialMenu}`),
  });
};

export const useGetListDishes = () => {
  return useQuery({
    queryKey: ['listDishes'],
    enabled: true,
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: () => getRequest(`/all_dishes`),
  });
};
// END Food


// Wish list
export const useGetDishByWishList = (dispatch: any) => {
  return useMutation({
    mutationKey: ['addWishList'],
    onSuccess: (data) => {
      if(data.status === false) {
        notify(data?.data, 'error');
        return;
      }
      dispatch(getWishListAPI(data.data));
    },
    onError: (err: any) => {
      notify(err, 'error');
    },
    mutationFn: (data: number) =>
      getRequest(`/dishes_by_wish_list?customerID=${data}`)
  });
};

export const useAddWishList = () => {
  return useMutation({
    mutationKey: ['addWishList'],
    onSuccess: (data) => {
      if(data.status === false) {
        notify(data?.data, 'error');
        return;
      }
    },
    onError: (err: any) => {
      notify(err, 'error');
    },
    mutationFn: (data: DataWishListRequest) =>
      postRequest(
        `/add_wish_list`,
        data,
      ),
  });
}

export const useDeleteWishList = () => {
  return useMutation({
    mutationKey: ['deleteWishList'],
    onSuccess: (data) => {
      if(data.status === false) {
        notify(data?.data, 'error');
        return;
      }
    },
    onError: (err: any) => {
      notify(err, 'error');
    },
    mutationFn: (data: DataWishListRequest) =>
      postRequest(
        `/delete_wish_list`,
        data,
      )
  });
}
// END wish list