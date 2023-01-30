import { Ticket, User } from '@acme/shared-models';
import { useCallback } from 'react';

import Task from '../../components/Ticket';

import styles from './index.module.css';
import useFilter, { FilterKey } from '../../hooks/useFilter';
import Filters from '../../components/Filters';

export interface TicketsProps {
  tickets: Ticket[];
  users: User[];
}

export function Tickets({ users, tickets }: TicketsProps) {
  const { addFilter, removeFilter, filteredTickets } = useFilter(tickets);

  const toggleHandler = useCallback(
    (filter: FilterKey, active: boolean) => {
      active ? addFilter(filter) : removeFilter(filter);
    },
    [addFilter, removeFilter]
  );

  return (
    <div className={styles['tickets']}>
      <Filters tickets={tickets} toggleHandler={toggleHandler} />
      {filteredTickets ? (
        <ul className={styles['list']}>
          {filteredTickets.map((t) => (
            <Task
              key={t.id}
              ticket={t}
              user={
                t.assigneeId
                  ? users.find((u) => u.id === t.assigneeId)
                  : undefined
              }
            />
          ))}
        </ul>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;
