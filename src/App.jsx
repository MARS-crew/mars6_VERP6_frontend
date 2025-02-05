import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import "./App.css";
import "./index.css";
import AppRoutes from "./routes/appRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.sessionStorage,
});

persistQueryClient({
  queryClient,
  persister,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <ReactQueryDevtools />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
