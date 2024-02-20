import { TodoItem } from '@core/model/todo';
import { TODO_ACTION_TYPE, TodoAction } from '@core/reducers/todo';
import { Dispatch } from 'react';

import Item from './Item';
import StatusMessage from './StatusMessage';

interface Props {
  todoList: TodoItem[];
  dispatch: Dispatch<TodoAction>;
}

function List({ todoList, dispatch }: Props) {
  const numberOfTasksLeft = todoList.filter((item) => !item.completed).length;
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
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
          <StatusMessage
            message={
              numberOfTasksLeft ? (
                <>
                  You have {numberOfTasksLeft} task
                  {numberOfTasksLeft > 1 ? 's' : ''} left.
                </>
              ) : (
                <>Congratulations! You have completed all of your tasks.</>
              )
            }
          />
        </>
      ) : (
        <StatusMessage message="No tasks at the moment" />
      )}
    </>
  );
}

export default List;
