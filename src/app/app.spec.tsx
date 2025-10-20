import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './app'

vi.mock(`../Layout`)

describe('App', () => {
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
})
