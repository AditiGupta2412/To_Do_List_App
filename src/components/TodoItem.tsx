import React from 'react';
import { Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';
import { Todo } from '../store/todoStore';
import { formatDate, isOverdue } from '../utils/dateUtils';
import { cn } from '../utils/helpers';
import '../styles/TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit
}) => {
  const overdue = isOverdue(todo.dueDate) && !todo.completed;

  return (
    <div
      className={cn('todo-item', {
        'todo-item--completed': todo.completed,
        'todo-item--overdue': overdue,
        'todo-item--high': todo.priority === 'high' && !todo.completed,
        'todo-item--medium': todo.priority === 'medium' && !todo.completed

      })}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className="todo-checkbox"
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed ? (
          <CheckCircle size={24} />
        ) : (
          <Circle size={24} />
        )}
      </button>

      <div className="todo-content">
        <div className="todo-header">
          <h3 className="todo-title">{todo.title}</h3>
          <span className={cn('priority-badge', `priority-${todo.priority}`)}>
            {todo.priority}
          </span>
        </div>

        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}

        <div className="todo-meta">
          {todo.dueDate && (
            <span className={cn('due-date', { 'due-date--overdue': overdue })}>
              {formatDate(todo.dueDate)}
            </span>
          )}

          {todo.tags.length > 0 && (
            <div className="tags">
              {todo.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button
          onClick={() => onEdit(todo)}
          className="action-btn edit-btn"
          aria-label="Edit task"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="action-btn delete-btn"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
