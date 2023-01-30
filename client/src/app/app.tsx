import { Routes, Route, Navigate } from 'react-router-dom';
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { Ticket, User } from '@acme/shared-models';

import Layout from './components/Layout';
import Tickets from './views/tickets';
import TicketDetails from './views/ticket';

import getAllTickets from '../context/tickets/compose/getAll';
import getAllUsers from '../context/users/compose/getAll';
import NotFound from './views/notFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // default: true
    },
  },
});

const App = () => {
  const { data: tickets } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: getAllTickets,
    initialData: [],
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getAllUsers,
    initialData: [],
  });

  console.log('tickets', tickets, users);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Tickets tickets={tickets} users={users} />} />
        <Route path="/:id" element={<TicketDetails />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Layout>
  );
};

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
