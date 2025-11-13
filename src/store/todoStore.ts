import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilter {
  status: 'all' | 'active' | 'completed';
  priority: 'all' | 'low' | 'medium' | 'high';
  search: string;
}

interface TodoStore {
  todos: Todo[];
  filter: TodoFilter;
  
  // Todo operations
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  
  // Filter operations
  setFilter: (filter: Partial<TodoFilter>) => void;
  resetFilter: () => void;
  
  // Bulk operations
  deleteCompleted: () => void;
  clearAll: () => void;
  
  // Getters
  getFilteredTodos: () => Todo[];
  getTodoById: (id: string) => Todo | undefined;
  getStats: () => { total: number; completed: number; active: number };
}

const generateId = (): string => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const defaultFilter: TodoFilter = {
  status: 'all',
  priority: 'all',
  search: ''
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: defaultFilter,

      addTodo: (todo) => {
        const newTodo: Todo = {
          ...todo,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({
          todos: [newTodo, ...state.todos]
        }));
      },

      updateTodo: (id, updates) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
              : todo
          )
        }));
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }));
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }));
      },

      setFilter: (filter) => {
        set((state) => ({
          filter: { ...state.filter, ...filter }
        }));
      },

      resetFilter: () => {
        set({ filter: defaultFilter });
      },

      deleteCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed)
        }));
      },

      clearAll: () => {
        set({ todos: [], filter: defaultFilter });
      },

      getFilteredTodos: () => {
        const { todos, filter } = get();
        return todos.filter((todo) => {
          // Status filter
          if (filter.status === 'active' && todo.completed) return false;
          if (filter.status === 'completed' && !todo.completed) return false;

          // Priority filter
          if (filter.priority !== 'all' && todo.priority !== filter.priority) {
            return false;
          }

          // Search filter
          if (filter.search) {
            const searchLower = filter.search.toLowerCase();
            const titleMatch = todo.title.toLowerCase().includes(searchLower);
            const descMatch = todo.description.toLowerCase().includes(searchLower);
            const tagMatch = todo.tags.some((tag) =>
              tag.toLowerCase().includes(searchLower)
            );
            if (!titleMatch && !descMatch && !tagMatch) return false;
          }

          return true;
        });
      },

      getTodoById: (id) => {
        return get().todos.find((todo) => todo.id === id);
      },

      getStats: () => {
        const todos = get().todos;
        return {
          total: todos.length,
          completed: todos.filter((t) => t.completed).length,
          active: todos.filter((t) => !t.completed).length
        };
      }
    }),
    {
      name: 'todo-store'
    }
  )
);
