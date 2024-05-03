import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import saveAs from 'file-saver';
import { toast } from 'sonner';

// eslint-disable-next-line import/no-cycle
import baseApi from './baseApi';

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

export const notify = (message: string, type?: ToastType): void => {
  if (type === 'info') {
    toast.info(message, {
      position: "top-right",
      duration: 5000,
    });
  }
  if (type === 'success') {
    toast.success(message, {
      position: "top-right",
      duration: 5000,
    });
  }
  if (type === 'warning') {
    toast.warning(message, {
      position: "top-right",
      duration: 5000,
    });
  }
  if (type === 'error') {
    toast.error(message, {
      position: "top-right",
      duration: 5000,
    });
  }
  if (!type || type === 'default') {
    toast(message, {
      position: "top-right",
      duration: 5000,
    });
  }
};

export const readVietnameseCurrency = (amount: number): String => {
  if (amount >= 1000000000) {
    if (amount % 1000000000 === 0) {
      return `${amount / 1000000000} tỷ`;
    }
    return `${(amount / 1000000000).toFixed(2)} tỷ`;
  }
  if (amount >= 1000000) {
    if (amount % 1000000 === 0) {
      return `${amount / 1000000} triệu`;
    }
    return `${(amount / 1000000).toFixed(2)} triệu`;
  }
  return `${amount.toLocaleString('vi-VN')} đồng`;
};

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

const refreshAccessToken = async (token: string): Promise<any> => {
  const res = await baseApi.post(
    '/security-service/oauth/token',
    {
      grant_type: 'refresh_token',
      refresh_token: token,
    },
    {
      headers: {
        Authorization: `Basic d2ViYXBwOmVuYW9AMTIz`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res;
};

const handleRefreshToken = (refreshToken: string) => {
  refreshAccessToken(refreshToken);
};

export const handleError = async (error: any): Promise<void> => {
  const originalRequest = { ...error.config };
  if (error?.response?.status === 401) {
    if (!originalRequest?.retry) {
      originalRequest.retry = true;
      const loginData = sessionStorage.getItem('loginData');
      const refreshToken = loginData
        ? JSON.parse(loginData).refresh_token
        : null;
      const response = (await handleRefreshToken(refreshToken)) as any;
      if (response?.data?.access_token) {
        // axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
        sessionStorage.setItem('loginData', JSON.stringify(response?.data));
        baseApi(error.config);
      } else {
        // xử lý khi refresh token lỗi
        // window.location.reload();
      }
    } else {
      // xử lý sau khi đã refresh
      // window.location.reload();
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
  data: any,
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
