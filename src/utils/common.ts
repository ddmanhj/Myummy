import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import saveAs from 'file-saver';
import { toast } from 'sonner';

// eslint-disable-next-line import/no-cycle
import baseApi from './baseApi';
import { isEmpty } from 'lodash';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

export const notify = (message: string, type?: ToastType): void => {
  if (type === 'info') {
    toast.info(message, {
      position: "top-right",
      duration: 2000,
    });
  }
  if (type === 'success') {
    toast.success(message, {
      position: "top-right",
      duration: 2000,
    });
  }
  if (type === 'warning') {
    toast.warning(message, {
      position: "top-right",
      duration: 2000,
    });
  }
  if (type === 'error') {
    toast.error(message, {
      position: "top-right",
      duration: 2000,
    });
  }
  if (!type || type === 'default') {
    toast(message, {
      position: "top-right",
      duration: 2000,
    });
  }
};

export const languageState = () => {
  const language = localStorage.getItem('i18nextLng');
  return language ?? 'vi';
}

export const readMoneyCurrency = (amount: number, language: string = "vi" ) => {
  if (language == "vi") {
    return Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  } else {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      currencyDisplay: 'narrowSymbol'
    }).format(amount / 25370)
  }
}

export const expToken = () => {
  const expirationTime = Cookies.get('expAccessToken') ?? 0;
  const currentTimestamp = Math.floor(Date.now() / 1000); // Thời gian hiện tại
  if (Number(expirationTime) > currentTimestamp) {
    return true
  } else {
    return false
  }
}

// so sánh thời gian hiện tại với thời gian truyền vào , trả về kiều 1 ngày trước, 1 giờ trước ....
export const checkTimeAgo = (time: string) => {
  const now = dayjs();
  const differenceInHours = now.diff(time, 'hour');
  const differenceInDays = now.diff(time, 'day');

  if (differenceInDays > 0) {
    return `${differenceInDays} ngày trước`;
  }
  if (differenceInHours >= 1) {
    return `${differenceInHours} giờ trước`;
  }
  return 'Vài phút trước';
};

export const refreshAccessToken = async (refreshToken: string): Promise<any> => {
  const res = await baseApi.post(
    '/auth/refresh_token',
    {
      grant_type: 'refresh_token',
    },
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    },
  );
  return res;
};

const handleRefreshToken = (refreshToken: string) => {
   return refreshAccessToken(refreshToken);
};

export const handleError = async (error: any): Promise<void> => {
  const loginData = Cookies.get('getRefreshToken');
  const originalRequest = { ...error.config };
  if (error?.response?.status === 403) {
    if (!originalRequest?.retry) {
      originalRequest.retry = true;
      const refreshToken = loginData
        ? loginData 
        : '';
        try {
          const response = await (handleRefreshToken(refreshToken)) as any;
          if (response?.data?.data) {
            axios.defaults.headers.common.Authorization = `${response.data.data.token}`;
            // Giải mã token để truy cập thông tin payload
            const decodedToken = jwtDecode(response?.data?.data?.token);

            // Kiểm tra thời gian hết hạn (expiration time) của token
            const expirationTime = decodedToken?.exp ?? '';
            Cookies.set('expAccessToken', expirationTime?.toString(), { expires: 2 });
            baseApi(error.config);
          }
        } catch (error) {
          window.location.href = '/auth/login';
        }
      
    } else {
      // xử lý sau khi đã refresh
      // window.location.reload();
    }
  }
  if (error?.response?.status === 401 || isEmpty(loginData)) {
    if (!originalRequest?.retry) {
      originalRequest.retry = true;
      if(!isEmpty(loginData)) {
        const refreshToken = loginData ? loginData : '';
        try {
          const response = await(handleRefreshToken(refreshToken ?? "")) as any;
        if (response?.data?.data && response?.status && response?.data?.data?.status == true) {
          const decodedToken = jwtDecode(response?.data?.data?.token);

          const expirationTime = decodedToken?.exp ?? '';
          Cookies.set('expAccessToken', expirationTime?.toString(), { expires: 2 });
          axios.defaults.headers.common.Authorization = `${response.data.data.token}`;
          baseApi(error.config);
        } else {
          window.location.href = '/auth/login';
        }
        } catch (error) {
          window.location.href = '/auth/login';
        }
      } else {
        if (error?.response?.status === 401)
        window.location.href = '/auth/login';
      }
    } else {
      window.location.href = '/auth/login';
    }
  }
};

export const getRequest = (
  url: string,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .get(url, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const getFileRequest = (
  url: string,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .get(url, config)
      .then((res: AxiosResponse) => {
        const contentDispositionHeader = res.headers['content-disposition'];
        if (contentDispositionHeader) {
          // Xử lý thông tin trong header Content-Disposition ở đây
          console.log(decodeURIComponent(contentDispositionHeader));
        } else {
          console.log('Không tìm thấy dữ liệu.');
        }
        const filenameRegex = /filename[^;=\n]*=utf-8''((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDispositionHeader);
        const filename =
          matches && matches[1] ? matches[1].replace(/['"]/g, '') : 'unknown';

        // console.log('Tên tệp tin:', decodeURIComponent(filename));
        const blob = new Blob([res.data], {
          type: res.headers['content-type'],
        });
        saveAs(blob, decodeURIComponent(filename) || 'File lỗi');
        return resolve(res?.data);
      })
      .catch((err: AxiosError) => reject(err));
  });
};

export const postRequest = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .post(url, data, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const deleteRequest = (
  url: string,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .delete(url, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const putRequest = (
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .put(url, data, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const downloadFile = (data: any, fileName: string): void => {
  const blob = new Blob(data);
  saveAs(blob, fileName);
};
