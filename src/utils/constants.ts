export const regexType = {
    // regex tên tài khoản
    userName: /^[a-z0-9]+$/, // minh123
  
    // regex mật khẩu
    passwordRegex:
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?!.*\s).{8,}$/,
  
    // tên tiếng việt không số và có kí hiệu (.,-&+) không nhận toàn khoảng trắng
    fullName:
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ.,&+-]+( [a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ.,&+-]+)*$/,
  
    // regex sdt ở việt nam
    vnNumberPhone: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
  
    // regex email
    // eslint-disable-next-line no-useless-escape
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  };
  export const baseApi = import.meta.env.VITE_BASE_API_URL;
  
  export const REFRESH_TOKEN = 'REFRESH_TOKEN';
  export const ACCESS_TOKEN = 'ACCESS_TOKEN';
  