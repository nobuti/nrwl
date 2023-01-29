import { Routes, Route } from 'react-router-dom';
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { Ticket, User } from '@acme/shared-models';

import Layout from './components/Layout';
import Tickets from './views/tickets';

import getAllTickets from '../context/tickets/compose/getAll';
import getAllUsers from '../context/users/compose/getAll';

const queryClient = new QueryClient();

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

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Tickets tickets={tickets} users={users} />} />
        <Route path="/:id" element={<h2>Details Not Implemented</h2>} />
      </Routes>
    </Layout>
  );
};

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
