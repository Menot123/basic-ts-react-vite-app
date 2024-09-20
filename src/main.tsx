import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            {/* {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);
