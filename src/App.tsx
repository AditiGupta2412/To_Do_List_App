import React, { useState } from 'react';
import { Todo, useTodoStore } from './store/todoStore';
import { TodoForm } from './components/TodoForm';
import { TodoFilter } from './components/TodoFilter';
import { TodoStats } from './components/TodoStats';
import { TodoItem } from './components/TodoItem';
import { EditTodoModal } from './components/EditTodoModal';
import './styles/App.css';

export const App: React.FC = () => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getFilteredTodos = useTodoStore((state) => state.getFilteredTodos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const filteredTodos = getFilteredTodos();

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updates: Partial<Todo>) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, updates);
      setEditingTodo(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTodo(id);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Professional Todo Manager</h1>
          <p className="app-subtitle">Stay organized, stay productive</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="content-grid">
            {/* Sidebar */}
            <aside className="sidebar">
              <TodoForm />
            </aside>

            {/* Main Content */}
            <section className="main-content">
              <TodoStats />

              <TodoFilter />

              <div className="todo-list">
                {filteredTodos.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <p className="empty-title">No tasks found</p>
                    <p className="empty-description">
                      {useTodoStore.getState().todos.length === 0
                        ? 'Create your first task to get started'
                        : 'Try adjusting your filters'}
                    </p>
                  </div>
                ) : (
                  filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={handleDeleteTodo}
                      onEdit={handleEdit}
                    />
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTodo(null);
          }}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};
