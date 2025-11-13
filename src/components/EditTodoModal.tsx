import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Todo } from '../store/todoStore';
import { sanitizeString } from '../utils/helpers';
import '../styles/EditTodoModal.css';

interface EditTodoModalProps {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<Todo>) => void;
}

export const EditTodoModal: React.FC<EditTodoModalProps> = ({
  todo,
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.dueDate || '');
  const [tags, setTags] = useState(todo.tags.join(', '));
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle(todo.title);
      setDescription(todo.description);
      setPriority(todo.priority);
      setDueDate(todo.dueDate || '');
      setTags(todo.tags.join(', '));
      setError('');
    }
  }, [isOpen, todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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

    const parsedTags = tags
      .split(',')
      .map((tag) => sanitizeString(tag))
      .filter(Boolean);

    if (parsedTags.length > 10) {
      setError('Maximum 10 tags allowed');
      return;
    }

    try {
      onSave({
        title: sanitizedTitle,
        description: sanitizedDescription,
        priority,
        dueDate: dueDate || null,
        tags: parsedTags
      });
      onClose();
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button onClick={onClose} className="close-btn" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="edit-title">Title *</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              className="form-input"
            />
            <span className="char-count">{title.length}/200</span>
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={3}
              className="form-textarea"
            />
            <span className="char-count">{description.length}/1000</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-priority">Priority</label>
              <select
                id="edit-priority"
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
              <label htmlFor="edit-dueDate">Due Date</label>
              <input
                id="edit-dueDate"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-tags">Tags</label>
            <input
              id="edit-tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
