import type { Project, Task } from '../../types';

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  onSelect: () => void;
  onDelete: () => void;
}

export default function ProjectCard({ project, tasks, onSelect, onDelete }: ProjectCardProps) {
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (doneCount / totalTasks) * 100 : 0;

  return (
    <div className="project-card" onClick={onSelect}>
      <div className="project-header">
        <div className="project-color" style={{ backgroundColor: project.color }}></div>
        <h3>{project.name}</h3>
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Delete project"
        >
          ×
        </button>
      </div>

      {project.description && (
        <p className="project-description">{project.description}</p>
      )}

      <div className="project-stats">
        <div className="stat">
          <span className="stat-label">To Do</span>
          <span className="stat-value">{todoCount}</span>
        </div>
        <div className="stat">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{inProgressCount}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Done</span>
          <span className="stat-value">{doneCount}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">{Math.round(progress)}% complete</p>
    </div>
  );
}
