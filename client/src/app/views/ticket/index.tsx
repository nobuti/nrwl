import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';

import getTicket from '../../../context/tickets/compose/get';
import getAllUsers from '../../../context/users/compose/getAll';

import styles from './index.module.css';

const TicketDetails = () => {
  const urlParams = useParams();
  const id = urlParams['id'] as string;

  const { data: ticket, status } = useQuery<Ticket>({
    queryKey: ['ticket', { id }],
    queryFn: () => getTicket(Number(id)),
    retry: false,
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getAllUsers,
    initialData: [],
  });

  console.log('ticket', ticket, users);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <Navigate to="/404" replace />;

  return (
    <div className={styles['container']}>
      <h2>{ticket.description}</h2>
      <dl>
        <dt>Asignee:</dt>
        <dd>
          {ticket.assigneeId
            ? users.find((u) => u.id === ticket.assigneeId)?.name
            : 'Unassigned'}
        </dd>
        <dt>Status:</dt>
        <dd>{ticket.completed ? 'Completed' : 'In progress'}</dd>
      </dl>
    </div>
  );
};

export default TicketDetails;
