import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";
import { getRequest, notify, postRequest } from "../utils/common";
import { LoginType, RegisterType } from "@/types/user";
import { getWishListAPI } from "@/redux/wishListSlice";
import { getInfoCustomer } from "@/redux/customerSlice";
import Cookies from "js-cookie";
import { DataWishListRequest } from "@/types/food";
import { PostCommentReviewType } from "@/types/other";
import { isEmpty } from "lodash";

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

// END Menu

// Register
export const useRegisterCustomer = (navigate: NavigateFunction) => {
  return useMutation({
    mutationKey: ['registerCustomer'],
    onSuccess: (data) => {
      if(data?.status === false) {
        notify(data?.data, 'error');
        return;
      } else {
        notify('Đăng ký thành công', 'success');
        navigate('/auth/login')
      }
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
// END Register

// Auth Login
export const useLoginCustomer = (dispatch: any, redirectAsRole: any) => {
  return useMutation({
    mutationKey: ['loginCustomer'],
    onSuccess: (data) => {
      if(data.status === false) {
        notify(data?.data, 'error');
        return;
      }
      const infoCustomer = {
        id: data?.data?.id,
        email: data?.data?.email,
        role: data?.data?.role,
        customerName: data?.data?.customerName,
        urlImageAvatar: data?.data?.urlImageAvatar,
        phone: data?.data?.phone,
        address: data?.data?.address,
        province: data?.data?.province,
        district: data?.data?.district,
        ward: data?.data?.ward,
        createdAt: data?.data?.createdAt,
        wishList: data?.data?.wishList
      }
      redirectAsRole(data.data.role, true);
      dispatch(getInfoCustomer(infoCustomer))
      dispatch(getWishListAPI(data?.data?.wishList));
      Cookies.set('getRefreshToken', data.data?.refreshToken, { expires: 7 });

      // Giải mã token để truy cập thông tin payload
      const decodedToken = jwtDecode(data?.data?.accessToken);

      // Kiểm tra thời gian hết hạn (expiration time) của token
      const expirationTime = decodedToken?.exp ?? '';
      Cookies.set('expAccessToken', expirationTime?.toString(), { expires: 2});
       
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

// END Login

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

export const useGetListFood = ( 
  page: number = 1,
  limit: number = 10,
  categories: number[] | undefined,
  priceRange: number [],
  rating: number | undefined,
  search: string | undefined) => {
  return useQuery({
    queryKey: ['listFood'],
    enabled: false,
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: () => getRequest(`/all_food?page=${page}&limit=${limit}&categoryID=${categories}&price=${priceRange}&reviewStars=${rating}&search=${search}`),
  });
}

export const useGetDetailFood = (id: number) => {
  return useQuery({
    queryKey: ['detailFood'],
    enabled: false,
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: () => getRequest(`/dish/${id}`),
  });
}

export const useGetListRandomFood = () => {
  return useQuery({
    queryKey: ['listRandomFood'],
    enabled: false,
    retry: 1,
    queryFn: () => getRequest(`/random_dishes`),
  });
}
// END Food

// Consumer Review
export const useGetReviewFood = (dishID: number, page: number, limit: number) => {
  return useQuery({
    queryKey: ['getReviewFood'],
    enabled: false,
    retry: 1,
    queryFn: () => getRequest(`/consumer_review?dishID=${dishID}&page=${page}&limit=${limit}`),
  });
}


export const usePostReview = () => {
  return useMutation({
    mutationKey: ['postReview'],
    onSuccess: () => {},
    onError: (err: any) => {
      notify(err, 'error');
    },
    mutationFn: (data: PostCommentReviewType) =>
      postRequest(
        `/consumer_review`,
        data,
      ),
  });
}
// END Consumer Review


// Wish list
export const useGetDishByWishList = (dispatch: any) => {
  return useMutation({
    mutationKey: ['getWishList'],
    retry: 1,
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

// Orders
export const useGoToPayment = () => {
  return useMutation({
    mutationKey: ['createOrder'],
    retry: 1,
    onSuccess: (data) => {
      if(isEmpty(data?.data?.urlPayment)) return notify('Fail to order', 'error');
      return data;
    },
    onError: (err: any) => {
      notify(err, 'error');
    },
    mutationFn: (data: any) =>
      postRequest(
        `/pay-order`,
        data,
      )
  });
}

export const useConfirmOrder = () => {
  return useMutation({
    mutationKey: ['confirmOrder'],
    retry: 1,
    onSuccess: () => {},
    onError: (err: any) => {
      notify(err, 'error');
    },
    mutationFn: (data: any) =>
      postRequest(
        `/create_order`,
        data
      )
  });
}

export const useGetListOrder = (page: number, limit: number, customerID: number) => {
  return useQuery({
    queryKey: ['listOrder'],
    enabled: true,
    retry: 1,
    queryFn: () => getRequest(`/orders?page=${page}&limit=${limit}&customerID=${customerID}`),
  });
}

export const useGetOrderDetail = (id: number) => {
  return useQuery({
    queryKey: ['getOrderDetail'],
    enabled: false,
    retry: 1,
    queryFn: () => getRequest(`/order/${id}`),
  });
}
// END Orders

// CALL API TỈNh THÀNH VIỆT NAM
export const useGetProvinceList = () => {
  return useMutation({
    mutationKey: ['getProvinceList'],
    onSuccess: (data) => {
      return data;
    },
    onError: (err: any) => {
      notify(err, 'error');
    },
    mutationFn: async() =>
      await fetch("https://vapi.vnappmob.com/api/province")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data?.results
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      })
  });
}

export const useGetDistrictList = () => {
  return useMutation({
    mutationKey: ['getDistrictList'],
    onSuccess: (data) => {
      return data;
    },
    onError: (err: any) => {
      notify(err, 'error');
    },
    mutationFn: async(province_id: string) =>
      await fetch(`https://vapi.vnappmob.com/api/province/district/${province_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data?.results
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      })
  });
}

export const useGetWardList = () => {
  return useMutation({
    mutationKey: ['getWardList'],
    onSuccess: (data) => {
      return data;
    },
    onError: (err: any) => {
      notify(err, 'error');
    },
    mutationFn: async(district_id: string) =>
      await fetch(`https://vapi.vnappmob.com/api/province/ward/${district_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data?.results
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      })
  });
}
// END CALL API TỈNh THÀNH VIỆT NAM