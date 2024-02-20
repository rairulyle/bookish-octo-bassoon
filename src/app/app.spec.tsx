import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

vi.mock(`../Layout`);

describe('App', () => {
  beforeAll(() => {
    localStorage.setItem(
      'todo-list',
      JSON.stringify([
        { id: 1708407293329, task: 'Buy milk', completed: false },
        { id: 1708407303746, task: 'Buy bread', completed: false },
      ])
    );
  });

  afterAll(() => {
    localStorage.clear();
  });

  it(`renders the initial list of tasks`, () => {
    render(<App />);
    expect(screen.getByDisplayValue(/Buy milk/i)).toBeTruthy();
    expect(screen.getByDisplayValue(/Buy bread/i)).toBeTruthy();
  });

  it(`can add custom tasks via an input field`, async () => {
    const user = userEvent.setup();
    const newTask = 'Buy Egg';

    render(<App />);

    const input = screen.queryAllByPlaceholderText('Take a note...')[0];

    await user.type(input, newTask);
    await user.keyboard('{Enter}');
    expect(screen.getByDisplayValue(newTask)).toBeInTheDocument();
  });

  it(`tracks the total number of tasks in the footer`, async () => {
    const user = userEvent.setup();

    render(<App />);

    const status = screen.getByTestId(`todo-status`);
    const input = screen.queryAllByPlaceholderText('Take a note...')[0];

    expect(status).toHaveTextContent(/You have 3 tasks left./i);

    await user.type(input, `some new task`);
    await user.keyboard('{Enter}');
    expect(status).toHaveTextContent(/You have 4 tasks left./i);
  });
});
