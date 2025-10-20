type TodoListProps = {
  items: string[]
  onAddItem: (item: string) => void
}

const TodoList = ({ items, onAddItem }: TodoListProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const task = formData.get('task')
    if (task && typeof task === 'string') {
      onAddItem(task)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Add Task</button>
      <input type="text" name="task" required placeholder="New task" />
      <ul>
        {items.map((item, i) => (
          <li key={`${item}-${i}`}>{item}</li>
        ))}
      </ul>
    </form>
  )
}

export default TodoList
