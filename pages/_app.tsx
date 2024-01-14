import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import type { AppProps } from "next/app";
import "react-indiana-drag-scroll/dist/style.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoutes from "./../components/Shared/ProtectedRoutes/index";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer
                position="top-right"
                pauseOnFocusLoss={false}
                autoClose={2500}
                closeButton
            />
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}
App.getInitialProps = ProtectedRoutes;
