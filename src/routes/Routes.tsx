import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import {
  AuthLayout,
  ClientLayout,
  DefaultLayout,
  AdminLayout,
} from "../layouts";
// import { useAuthContext } from "@/context";
import {
  allAuthFlattedRoutes,
  clientPublicFlattedRoutes,
  clientProtectedFlattedRoutes,
  allAdminFlattedRoutes,
  allBlankFlattedRoutes,
} from "./index";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Cookies from "js-cookie";

const AllRoutes = (props: RouteProps) => {
  const customerData = useSelector(
    (customer: any) => customer.customer.customer
  );
  const session = Cookies.get("getRefreshToken");

  return (
    <Routes>
      <Route>
        {/*Route không auth. Sử dụng layout DefaultLayout */}
        {allBlankFlattedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={<DefaultLayout {...props}>{route.element}</DefaultLayout>}
          />
        ))}
      </Route>

      <Route>
        {/*Route auth (cần đăng nhập, đăng ký, quên mật khẩu,...). Sử dụng layout AuthLayout */}
        {allAuthFlattedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={<AuthLayout {...props}>{route.element}</AuthLayout>}
          />
        ))}
      </Route>

      <Route>
        {/*Route auth danh riêng cho user. Sử dụng layout ClientLayout */}
        {clientPublicFlattedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={<ClientLayout {...props}>{route.element}</ClientLayout>}
          />
        ))}
      </Route>

      <Route>
        {/*Route auth danh riêng cho user nhưng chưa đăng nhập thì bắt đăng nhập, đăng nhập thành công đưa đến route muốn đến */}
        {clientProtectedFlattedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              !isEmpty(session) && customerData?.role == "customer" ? (
                <ClientLayout {...props}>{route.element}</ClientLayout>
              ) : (
                <Navigate
                  to={{
                    pathname: "/auth/login",
                    search: "redirectTo=" + route.path,
                  }}
                />
              )
            }
          />
        ))}
      </Route>

      <Route>
        {/*Route auth danh riêng cho admin, nếu chưa đăng nhập và không phải admin sẽ dẫn đến trang đăng nhập. Sử dụng layout AdminLayout */}
        {allAdminFlattedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              !isEmpty(session) && customerData?.role == "admin" ? (
                <AdminLayout {...props}>{route.element}</AdminLayout>
              ) : (
                <Navigate
                  to={{
                    pathname: "/auth/login",
                    search: "redirectTo=" + route.path,
                  }}
                />
              )
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default AllRoutes;
