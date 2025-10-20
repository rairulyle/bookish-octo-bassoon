import { useCallback, useState } from 'react'
import Layout from '../Layout'
import TodoList from '../TodoList/TodoList'
import './app.css'

function App() {
  const [items, setItems] = useState<string[]>([])

  const handleAddItem = useCallback((item: string) => {
    setItems((prev) => [...prev, item])
  }, [])

  return (
    <Layout>
      <TodoList items={items} onAddItem={handleAddItem} />
    </Layout>
  )
}

export default App
