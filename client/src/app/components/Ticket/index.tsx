import { Ticket, User } from '@acme/shared-models';
import { Link } from 'react-router-dom';

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
    <li data-testid="ticket">
      <Link className={styles['ticket']} to={`/${ticket.id}`}>
        <Status ticket={ticket} />
        <div className={styles['description']}>{ticket.description}</div>
        {isAssigned && (
          <div className={styles['avatar']}>
            <Avatar user={user} />
          </div>
        )}
      </Link>
    </li>
  );
};

export default Ticket;
