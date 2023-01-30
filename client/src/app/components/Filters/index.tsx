import { useMemo } from 'react';
import { Ticket } from '@acme/shared-models';

import { FilterKey } from '../../hooks/useFilter';
import Toggle from '../../components/Toggle';

import styles from './index.module.css';

type FiltersProps = {
  tickets: Ticket[];
  toggleHandler: (filter: FilterKey, active: boolean) => void;
};

const Filters = ({ tickets, toggleHandler }: FiltersProps) => {
  const stats = useMemo<Record<string, number>>(() => {
    const completed = tickets.reduce(
      (acc, t) => acc + (t.completed ? 1 : 0),
      0
    );
    const assigned = tickets.reduce(
      (acc, t) => acc + (t.assigneeId !== null ? 1 : 0),
      0
    );

    const unassigned = tickets.reduce(
      (acc, t) => acc + (t.assigneeId === null ? 1 : 0),
      0
    );

    return {
      completed,
      assigned,
      unassigned,
    };
  }, [tickets]);

  return (
    <div className={styles['container']}>
      <h2>Filter by</h2>
      <ul className={styles['filters']}>
        {(['completed', 'unassigned'] as FilterKey[]).map((filter) => (
          <li key={filter}>
            <Toggle onChange={(active) => toggleHandler(filter, active)}>
              {filter} <span>{stats[filter]}</span>
            </Toggle>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
