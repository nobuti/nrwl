import { Ticket } from '@acme/shared-models';
import clsx from 'clsx';

import styles from './index.module.css';

type StatusProps = {
  ticket: Ticket;
};

const Status = ({ ticket }: StatusProps) => {
  const derivedClassName = clsx(styles['status'], {
    [styles['pending']]: !ticket.completed,
    [styles['completed']]: ticket.completed,
  });

  return (
    <i
      className={derivedClassName}
      title={ticket.completed ? 'Completed' : 'In progress'}
    />
  );
};

export default Status;
