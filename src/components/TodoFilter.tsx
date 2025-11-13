import React from 'react';
import { Search, X } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';
import '../styles/TodoFilter.css';

export const TodoFilter: React.FC = () => {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);
  const resetFilter = useTodoStore((state) => state.resetFilter);

  const hasActiveFilter =
    filter.status !== 'all' || filter.priority !== 'all' || filter.search !== '';

  return (
    <div className="filter-container">
      <div className="filter-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter.search}
          onChange={(e) => setFilter({ search: e.target.value })}
          className="search-input"
        />
      </div>

      <div className="filter-controls">
        <select
          value={filter.status}
          onChange={(e) => setFilter({ status: e.target.value as any })}
          className="filter-select"
        >
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filter.priority}
          onChange={(e) => setFilter({ priority: e.target.value as any })}
          className="filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {hasActiveFilter && (
          <button onClick={resetFilter} className="reset-btn" title="Clear filters">
            <X size={18} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};
