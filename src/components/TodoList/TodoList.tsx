import { TodoItem } from '@core/model/todo';
import { TODO_ACTION_TYPE, todoReducer } from '@core/reducers/todo';
import { useEffect, useReducer, useState } from 'react';

import Item from './Item';
import List from './List';

const initialState: TodoItem = {
  id: +new Date(),
  task: '',
  completed: false,
};

const TodoList = () => {
  const storedList = JSON.parse(localStorage.getItem('todo-list') || '[]') as TodoItem[];
  const [todoList, dispatch] = useReducer(todoReducer, storedList);
  const [newTask, setNewTask] = useState<TodoItem>(initialState);

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="p-4 border dark:border-white dark:border-opacity-50 rounded-md">
      <Item
        value={newTask}
        onAdd={(value) => {
          dispatch({ type: TODO_ACTION_TYPE.ADD, payload: [value] });
          setNewTask({ ...initialState, id: +new Date() });
        }}
        onChange={setNewTask}
      />
      <List todoList={todoList} dispatch={dispatch} />
    </div>
  );
};

export default TodoList;
