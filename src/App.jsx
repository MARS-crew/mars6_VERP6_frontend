import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import "./App.css";
import "./index.css";
import AppRoutes from "./routes/appRoutes";
import Toast from './components/Toast/Toast';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toast />
        <ReactQueryDevtools />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
