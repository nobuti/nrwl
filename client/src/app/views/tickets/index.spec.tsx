import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import Tickets from './index';

const mockTickets = [
  {
    id: 1,
    assigneeId: 1,
    completed: true,
    description: 'Install a monitor arm',
  },
  {
    id: 2,
    assigneeId: null,
    completed: false,
    description: 'Move the desk to the new location',
  },
];

const mockUsers = [
  {
    id: 1,
    name: 'Alice',
  },
  {
    id: 2,
    name: 'Bob',
  },
];

describe('Tickets View', () => {
  it('should render properly', () => {
    render(<Tickets tickets={mockTickets} users={mockUsers} />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getAllByTestId('ticket')).toHaveLength(mockTickets.length);
  });

  it('should filter properly', async () => {
    render(<Tickets tickets={mockTickets} users={mockUsers} />, {
      wrapper: BrowserRouter,
    });

    const completedToggle = screen.getByText('completed');
    await userEvent.click(completedToggle);

    expect(screen.getAllByTestId('ticket')).toHaveLength(
      mockTickets.filter((t) => t.completed).length
    );
  });
});
