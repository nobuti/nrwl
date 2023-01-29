import { Ticket, User } from '@acme/shared-models';

import Task from '../../components/Ticket';

import styles from './index.module.css';

export interface TicketsProps {
  tickets: Ticket[];
  users: User[];
}

export function Tickets({ users, tickets }: TicketsProps) {
  return (
    <div className={styles['tickets']}>
      {tickets ? (
        <ul>
          {tickets.map((t) => (
            <Task
              key={t.id}
              ticket={t}
              user={t.assigneeId ? users[t.assigneeId] : undefined}
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
