import { type ReactNode, useEffect, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider, FilterProvider, LayoutProvider } from "@/context";
const ShopProvider = lazy(() => import("@/context/useShoppingContext"));

const AppProvidersWrapper = ({ children }: { children: ReactNode }) => {
  const handleChangeTitle = () => {
    if (document.visibilityState == "hidden")
      document.title = "Please come back 😥";
    else document.title = "Myummy";
  };

  useEffect(() => {
    import("preline");

    document.addEventListener("visibilitychange", handleChangeTitle);
    return () => {
      document.removeEventListener("visibilitychange", handleChangeTitle);
    };
  }, []);

  return (
    // HelmetProvider dùng để thay đổi thẻ meta, thay đổi title của trang web
    <HelmetProvider>
      {/* Sử dụng Layout Context để tùy chỉnh theme light or dark */}
      <LayoutProvider>
        {/* Auth để xấc minh quyền */}
        <AuthProvider>
          <ShopProvider>
            <FilterProvider>{children}</FilterProvider>
          </ShopProvider>
        </AuthProvider>
      </LayoutProvider>
    </HelmetProvider>
  );
};
export default AppProvidersWrapper;
