import React from 'react';
import { Trash2, CheckSquare } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';
import '../styles/TodoStats.css';

export const TodoStats: React.FC = () => {
  const getStats = useTodoStore((state) => state.getStats);
  const deleteCompleted = useTodoStore((state) => state.deleteCompleted);
  const stats = getStats();

  const completionPercentage =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="stats-container">
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>

        <div className="stat-card stat-card--active">
          <div className="stat-value">{stats.active}</div>
          <div className="stat-label">Active</div>
        </div>

        <div className="stat-card stat-card--completed">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>

        <div className="stat-card stat-card--progress">
          <div className="stat-value">{completionPercentage}%</div>
          <div className="stat-label">Progress</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {stats.completed > 0 && (
        <button onClick={deleteCompleted} className="clear-completed-btn">
          <Trash2 size={16} />
          Clear Completed ({stats.completed})
        </button>
      )}
    </div>
  );
};
