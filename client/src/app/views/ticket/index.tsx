import { useCallback, ChangeEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';

import getTicket from '../../../context/tickets/compose/get';
import completeTicket from '../../../context/tickets/compose/complete';
import uncompleteTicket from '../../../context/tickets/compose/uncomplete';
import getAllUsers from '../../../context/users/compose/getAll';
import Switch from '../../components/Switch';

import styles from './index.module.css';

const TicketDetails = () => {
  const urlParams = useParams();
  const queryClient = useQueryClient();
  const id = urlParams['id'] as string;

  const { data: ticket, status } = useQuery<Ticket>({
    queryKey: ['ticket', id],
    queryFn: () => getTicket(Number(id)),
    retry: false,
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getAllUsers,
    initialData: [],
  });

  const completeMutation = useMutation({
    mutationFn: completeTicket,
    onSettled: () => {
      queryClient.invalidateQueries(['tickets']);
      queryClient.invalidateQueries(['ticket', id]);
    },
  });

  const uncompleteMutation = useMutation({
    mutationFn: uncompleteTicket,
    onSettled: () => {
      queryClient.invalidateQueries(['tickets']);
      queryClient.invalidateQueries(['ticket', id]);
    },
  });

  const onCompleteHandle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (uncompleteMutation.isLoading || completeMutation.isLoading) {
        return;
      }

      if (ticket) {
        ticket.completed
          ? uncompleteMutation.mutate(ticket)
          : completeMutation.mutate(ticket);
      }
    },
    [ticket, completeMutation, uncompleteMutation]
  );

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
        <dt>Completed:</dt>
        <dd>
          <Switch
            loading={completeMutation.isLoading || uncompleteMutation.isLoading}
            status={ticket.completed ? 'on' : 'off'}
            onChange={onCompleteHandle}
          />
        </dd>
      </dl>
    </div>
  );
};

export default TicketDetails;
