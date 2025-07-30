import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoApp from '../components/TodoApp';
import API from '../api';
import '@testing-library/jest-dom';

// ✅ Use `vi.mock()` instead of `jest.mock()`
vi.mock('../api');

describe('TodoApp Frontend', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    API.get.mockResolvedValue({ data: [] });
  });

  it('renders the form and Add button', () => {
    render(<TodoApp />);
    expect(screen.getByPlaceholderText(/Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Add/i)).toBeInTheDocument();
  });

  it('loads existing todos on mount', async () => {
    const todos = [{ id: 1, text: 'Buy milk', time: '2025-07-03T10:00' }];
    API.get.mockResolvedValueOnce({ data: todos });

    render(<TodoApp />);

    await waitFor(() => {
      expect(screen.getByText(/Buy milk/i)).toBeInTheDocument();
    });
  });

  it('adds a new todo', async () => {
    API.post.mockResolvedValueOnce({ status: 201 });

    API.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({
        data: [{ id: 2, text: 'Study DevOps', time: '2025-07-03T15:00' }],
      });

    render(<TodoApp />);

    fireEvent.change(screen.getByPlaceholderText(/Task/i), {
      target: { value: 'Study DevOps' },
    });

    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: '2025-07-03T15:00' },
    });

    fireEvent.click(screen.getByText(/Add/i));

    await waitFor(() => {
      expect(screen.getByText(/Study DevOps/i)).toBeInTheDocument();
    });
  });

  it('deletes a todo', async () => {
    const todos = [{ id: 3, text: 'Delete me', time: '2025-07-03T17:00' }];
    API.get
      .mockResolvedValueOnce({ data: todos })
      .mockResolvedValueOnce({ data: [] });

    API.delete.mockResolvedValueOnce({ status: 200 });

    render(<TodoApp />);

    await waitFor(() => {
      expect(screen.getByText(/Delete me/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/❌/));

    await waitFor(() => {
      expect(screen.queryByText(/Delete me/i)).not.toBeInTheDocument();
    });
  });
});

