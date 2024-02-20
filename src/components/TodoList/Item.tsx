import { TodoItem } from '@core/model/todo';
import { useState } from 'react';

interface Props {
  value: TodoItem;
  tabIndex?: number;
  onChange?: (task: TodoItem) => void;
  onAdd?: (task: TodoItem) => void;
  onDelete?: (task: TodoItem) => void;
}

function Item({ value, tabIndex, onChange, onAdd, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false); // when user is adding new item
  const [isActive, setIsActive] = useState(false); // for item hover

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="flex gap-x-2 items-center">
        {!onAdd && (
          <input
            tabIndex={-1}
            type="checkbox"
            checked={value.completed}
            onChange={(e) =>
              onChange?.({ ...value, completed: e.target.checked })
            }
          />
        )}
        <input
          tabIndex={tabIndex}
          placeholder="Take a note..."
          type="text"
          className={`p-2 rounded-md focus:outline-none bg-transparent w-full ${
            value.completed && 'line-through'
          }`}
          value={value.task}
          onKeyDown={(e) => e.key === 'Enter' && value.task && onAdd?.(value)}
          onChange={(e) => onChange?.({ ...value, task: e.target.value })}
          // For add new item
          onFocus={() => !!onAdd && setIsEditing(true)}
          onBlur={() => !!onAdd && setIsEditing(false)}
          // For update item
        />
        {!onAdd && isActive && (
          <button
            type="button"
            className="flex items-center justify-center text-xs  border-white border p-1 rounded-full border-opacity-20 h-6 w-6 focus:outline-none"
            onClick={() => onDelete?.(value)}
          >
            x
          </button>
        )}
      </div>

      {!!onAdd && isEditing && (
        <span className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xs  border-white border p-1 rounded-md border-opacity-20">
          Enter
        </span>
      )}
    </div>
  );
}

export default Item;
