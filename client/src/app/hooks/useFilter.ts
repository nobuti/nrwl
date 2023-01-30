import { useCallback, useMemo, useState } from 'react';
import { Ticket } from '@acme/shared-models';

type Filter = (t: Ticket) => boolean;
export type FilterKey = 'completed' | 'unassigned';

const FILTERS: Record<FilterKey, Filter> = {
  completed: (t: Ticket) => t.completed,
  unassigned: (t: Ticket) => t.assigneeId === null,
};

const filterBy = (filters: FilterKey[], tickets: Ticket[]): Ticket[] => {
  const appliedFilters = [...filters];
  console.log(filters, tickets);

  return appliedFilters.length
    ? appliedFilters.reduce((acc, filter) => {
        return [...acc].filter(FILTERS[filter]);
      }, tickets)
    : tickets;
};

const useFilter = (tickets: Ticket[]) => {
  const [filters, updateFilters] = useState<FilterKey[]>([]);

  const addFilter = useCallback(
    (filter: FilterKey) => updateFilters([...filters, filter]),
    [filters]
  );

  const removeFilter = useCallback(
    (filter: FilterKey) => updateFilters(filters.filter((f) => f !== filter)),
    [filters]
  );

  const filteredTickets = useMemo(
    () => filterBy(filters, tickets),
    [tickets, filters]
  );
  const appliedFilters = useMemo(() => filters, [filters]);

  return {
    addFilter,
    removeFilter,
    filteredTickets,
    appliedFilters,
  };
};

export default useFilter;
