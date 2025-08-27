'use client';

import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Todo App
        </h1>

        {/* Add Todo Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 
                       dark:text-white dark:placeholder-gray-400"
          />
          <Button onClick={addTodo} className="px-4 py-2">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          {(['all', 'active', 'completed'] as Filter[]).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-2 mb-4">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 dark:border-gray-500 hover:border-green-500'
                }`}
              >
                {todo.completed && <Check className="h-3 w-3" />}
              </button>
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-800 dark:text-white'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {filteredTodos.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {filter === 'all' && todos.length === 0
                ? 'No todos yet. Add one above!'
                : filter === 'active' && activeTodosCount === 0
                ? 'No active todos!'
                : filter === 'completed' && todos.filter(t => t.completed).length === 0
                ? 'No completed todos!'
                : 'No todos match the current filter.'}
            </div>
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>
              {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
            </span>
            {todos.some(todo => todo.completed) && (
              <button
                onClick={clearCompleted}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
