import { ToDoStatus } from '@core/model/status';
import { TodoItem } from '@core/model/todo';
import { TODO_ACTION_TYPE, todoReducer } from '@core/reducers/todo';
import { useReducer, useState } from 'react';

import Item from './Item';

const initialState: TodoItem = {
  id: +new Date(),
  task: '',
  completed: false,
};

type ConditionalProps =
  | { status: ToDoStatus.ERROR; errorMessage: string }
  | { status: ToDoStatus.SUCCESS; successMessage: string };

type Props = {
  onTaskChange: (items: string[]) => void;
} & ConditionalProps;

const TodoList = (props: Props) => {
  const [todoList, dispatch] = useReducer(todoReducer, []);
  const [newTask, setNewTask] = useState<TodoItem>(initialState);

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
      <ul className="max-h-[50vh] overflow-y-auto w-full p-2">
        {todoList.length ? (
          todoList.map((item, i) => (
            <li key={item.id}>
              <Item
                value={item}
                tabIndex={i + 1}
                onChange={(value) =>
                  dispatch({ type: TODO_ACTION_TYPE.UPDATE, payload: [value] })
                }
                onDelete={(value) =>
                  dispatch({ type: TODO_ACTION_TYPE.DELETE, payload: [value] })
                }
              />
            </li>
          ))
        ) : (
          <li className="text-center">
            <span className="text-sm opacity-50">No tasks at the moment</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
