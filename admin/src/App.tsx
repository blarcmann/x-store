import { QueryClientProvider, QueryClient } from "react-query";
import Routes from "./routes";
import ThemeProvider from "./theme";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
