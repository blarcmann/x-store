import {QueryClientProvider, QueryClient} from 'react-query';
import Routes from './routes';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
