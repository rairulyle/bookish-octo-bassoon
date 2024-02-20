import { useState } from 'react'
import Layout from '../Layout'
import './app.css'
import { TodoList } from '@components/TodoList'
import { ToDoStatus } from '@core/model/status'

function App() {
  const [numOfTask, setNumOfTask] = useState(0)

  return (
    <Layout
      complementary={
        <p>
          You have <strong>{numOfTask}</strong> total tasks.
        </p>
      }
    >
      <TodoList
        status={ToDoStatus.ERROR}
        errorMessage="Name of the task should be supplied"
        onTaskChange={(e) => setNumOfTask(e.length)}
      />
    </Layout>
  )
}

export default App
