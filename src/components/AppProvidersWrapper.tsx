import { type ReactNode, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { FilterProvider, LayoutProvider } from "@/context";

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
        <FilterProvider>{children}</FilterProvider>
      </LayoutProvider>
    </HelmetProvider>
  );
};
export default AppProvidersWrapper;
