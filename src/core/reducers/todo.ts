import { TodoItem } from '@core/model/todo';

export enum TODO_ACTION_TYPE {
  LOAD = 'LOAD',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

const sortItemsByUncheckedFirst = (items: TodoItem[]) => {
  return items.sort((a, b) => Number(a.completed) - Number(b.completed));
};

interface TodoAction {
  type: TODO_ACTION_TYPE;
  payload: TodoItem[];
}

export const todoReducer = (
  state: TodoItem[],
  action: TodoAction
): TodoItem[] => {
  switch (action.type) {
    case TODO_ACTION_TYPE.LOAD:
      return [...action.payload];
    case TODO_ACTION_TYPE.ADD:
      return [...sortItemsByUncheckedFirst([...state, action.payload[0]])];
    case TODO_ACTION_TYPE.UPDATE:
      return [
        ...sortItemsByUncheckedFirst(
          state.map((item) =>
            item.id === action.payload[0].id ? action.payload[0] : item
          )
        ),
      ];
    case TODO_ACTION_TYPE.DELETE:
      return [...state.filter((item) => item.id !== action.payload[0].id)];
    default:
      return state;
  }
};
