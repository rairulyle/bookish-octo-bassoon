import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './app'

vi.mock(`../Layout`)

describe('App', () => {
  it(`renders the initial list of tasks`, () => {
    render(<App />)
    expect(screen.getByText(/Buy milk/i)).toBeTruthy()
    expect(screen.getByText(/Buy bread/i)).toBeTruthy()
  })

  it(`can add custom tasks via an input field`, async () => {
    const user = userEvent.setup()
    const newTask = `Brush teeth`

    render(<App />)

    const button = screen.getByText(/Add Task/i)
    const input = screen.getByPlaceholderText(/new task/i)

    await user.type(input, newTask)
    await user.click(button)
    expect(screen.getByText(newTask)).toBeInTheDocument()
  })

  it(`tracks the total number of tasks in the footer`, async () => {
    const user = userEvent.setup()

    render(<App />)

    const aside = screen.getByRole(`complementary`)
    const button = screen.getByText(/Add Task/i)
    const input = screen.getByPlaceholderText(/new task/i)

    expect(aside).toHaveTextContent(/you have 3 total tasks/i)

    await user.type(input, `some new task`)
    await user.click(button)
    expect(aside).toHaveTextContent(/you have 4 total tasks/i)
  })
})
