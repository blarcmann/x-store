import type { AppProps } from "next/app";
import { useRef } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";

import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
// external css
import "react-toastify/dist/ReactToastify.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

const Noop: React.FC = ({ children }: any) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const Layout = (Component as any).Layout || Noop;

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ManagedUIContext>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} key={router.route} />
              <ToastContainer />
            </Layout>
            <ManagedDrawer />
          </ManagedUIContext>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AnimatePresence>
  );
};

export default CustomApp;
