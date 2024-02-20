import { TodoItem } from '@core/model/todo';
import { TODO_ACTION_TYPE, todoReducer } from '@core/reducers/todo';
import { useEffect, useReducer, useRef, useState } from 'react';

import Item from './Item';

const initialState: TodoItem = {
  id: +new Date(),
  task: '',
  completed: false,
};

const TodoList = () => {
  const [firstRender, setFirstRender] = useState(true);
  const [todoList, dispatch] = useReducer(todoReducer, []);
  const [newTask, setNewTask] = useState<TodoItem>(initialState);
  const numberOfTasksLeft = todoList.filter((item) => !item.completed).length;

  // Load from local storage
  useEffect(() => {
    const localTodoList = localStorage.getItem('todo-list');
    if (localTodoList) {
      dispatch({
        type: TODO_ACTION_TYPE.LOAD,
        payload: JSON.parse(localTodoList),
      });
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!firstRender) {
      localStorage.setItem('todo-list', JSON.stringify(todoList));
    } else {
      setFirstRender(false);
    }
  }, [todoList, firstRender]);

  return (
    <div className="p-4 border border-white border-opacity-20 rounded-md">
      <Item
        value={newTask}
        tabIndex={1}
        onAdd={(value) => {
          dispatch({ type: TODO_ACTION_TYPE.ADD, payload: [value] });
          setNewTask({ ...initialState, id: +new Date() });
        }}
        onChange={setNewTask}
      />
      {todoList.length ? (
        <>
          <ul className="max-h-[50vh] overflow-y-auto w-full p-2">
            {todoList.map((item, i) => (
              <li key={item.id}>
                <Item
                  value={item}
                  tabIndex={i + 1}
                  onChange={(value) =>
                    dispatch({
                      type: TODO_ACTION_TYPE.UPDATE,
                      payload: [value],
                    })
                  }
                  onDelete={(value) =>
                    dispatch({
                      type: TODO_ACTION_TYPE.DELETE,
                      payload: [value],
                    })
                  }
                />
              </li>
            ))}
          </ul>
          <div className="text-center">
            <span className="text-sm opacity-50">
              {numberOfTasksLeft ? (
                <>
                  You have {numberOfTasksLeft} task
                  {numberOfTasksLeft > 1 ? 's' : ''} left.
                </>
              ) : (
                <>Congratulations! You have completed all of your tasks.</>
              )}
            </span>
          </div>
        </>
      ) : (
        <div className="text-center">
          <span className="text-sm opacity-50">No tasks at the moment</span>
        </div>
      )}
    </div>
  );
};

export default TodoList;
