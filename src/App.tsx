import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { Toaster } from "sonner";
import { AppProvidersWrapper, BackToTop } from "./components";
import AllRoutes from "./routes/Routes";

// styles
import "@/assets/css/style.css";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
