import type { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };


  return (
    <div className={`task-item ${task.status === 'done' ? 'task-done' : ''}`}>
      <div className="task-header">
        <div className="task-title-section">
          <input
            type="checkbox"
            checked={task.status === 'done'}
            onChange={(e) => {
              onUpdate({ status: e.target.checked ? 'done' : 'todo' });
            }}
            className="task-checkbox"
          />
          <h4>{task.title}</h4>
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        <button
          className="delete-btn"
          onClick={onDelete}
          aria-label="Delete task"
        >
          ×
        </button>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <select
          value={task.status}
          onChange={(e) => onUpdate({ status: e.target.value as Task['status'] })}
          className="status-select"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {task.due_date && (
          <span className="due-date">
            📅 {new Date(task.due_date).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
