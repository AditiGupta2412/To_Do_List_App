import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';
import { sanitizeString } from '../utils/helpers';
import '../styles/TodoForm.css';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    const sanitizedTitle = sanitizeString(title);
    if (!sanitizedTitle) {
      setError('Title is required');
      return;
    }

    if (sanitizedTitle.length > 200) {
      setError('Title must be less than 200 characters');
      return;
    }

    const sanitizedDescription = sanitizeString(description);
    if (sanitizedDescription.length > 1000) {
      setError('Description must be less than 1000 characters');
      return;
    }

    // Parse tags
    const parsedTags = tags
      .split(',')
      .map((tag) => sanitizeString(tag))
      .filter(Boolean);

    if (parsedTags.length > 10) {
      setError('Maximum 10 tags allowed');
      return;
    }

    try {
      addTodo({
        title: sanitizedTitle,
        description: sanitizedDescription,
        priority,
        dueDate: dueDate || null,
        tags: parsedTags,
        completed: false
      });

      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setTags('');
    } catch (err) {
      setError('Failed to add todo. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-header">
        <h2 className="form-title">Create New Task</h2>
      </div>

      {error && (
        <div className="form-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Task Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="form-input"
          maxLength={200}
        />
        <span className="char-count">{title.length}/200</span>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add task details (optional)"
          className="form-textarea"
          maxLength={1000}
          rows={3}
        />
        <span className="char-count">{description.length}/1000</span>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="form-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            id="dueDate"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="tags" className="form-label">
          Tags
        </label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Comma-separated tags (e.g. work, urgent, project-x)"
          className="form-input"
        />
        <span className="form-hint">Separate multiple tags with commas</span>
      </div>

      <button type="submit" className="submit-btn">
        <Plus size={18} />
        Add Task
      </button>
    </form>
  );
};
