import { Ticket, User } from '@acme/shared-models';

import Avatar from '../Avatar';
import Status from '../Status';

import styles from './index.module.css';

export type TicketProps = {
  ticket: Ticket;
  user?: User;
};

const Ticket = ({ ticket, user }: TicketProps) => {
  const isAssigned = !!user;

  return (
    <li className={styles['ticket']}>
      <Status ticket={ticket} />
      <div className={styles['description']}>{ticket.description}</div>
      {isAssigned && (
        <div className={styles['avatar']}>
          <Avatar user={user} />
        </div>
      )}
    </li>
  );
};

export default Ticket;
