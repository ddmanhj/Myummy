import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { Toaster } from "sonner";
import { AppProvidersWrapper, BackToTop } from "./components";
import AllRoutes from "./routes/Routes";
import { configureFakeBackend } from "@/common";

// styles
import "@/assets/css/style.css";

configureFakeBackend();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const Loading = () => <div>Loading...</div>;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <AppProvidersWrapper>
            <AllRoutes />
            <BackToTop />
            <Toaster richColors />
          </AppProvidersWrapper>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
