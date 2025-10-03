import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { Project, Task } from '../types';
import Header from '../components/Dashboard/Header';
import ProjectCard from '../components/Dashboard/ProjectCard';
import TaskItem from '../components/Dashboard/TaskItem';
import Modal from '../components/Dashboard/Modal';

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    due_date: '',
  });

  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: '1',
        name: 'Personal',
        description: 'Personal tasks and goals',
        color: '#3B82F6',
        owner_id: user?.id || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Work',
        description: 'Work-related tasks',
        color: '#10B981',
        owner_id: user?.id || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Complete project proposal',
        description: 'Write and submit the Q1 project proposal',
        status: 'in_progress',
        priority: 'high',
        project_id: '2',
        created_by: user?.id || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Review code changes',
        description: 'Review pull requests from team members',
        status: 'todo',
        priority: 'medium',
        project_id: '2',
        created_by: user?.id || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Buy groceries',
        description: 'Weekly grocery shopping',
        status: 'todo',
        priority: 'low',
        project_id: '1',
        created_by: user?.id || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    setProjects(sampleProjects);
    setTasks(sampleTasks);
  }, [user]);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      owner_id: user?.id || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProjects([...projects, project]);
    setNewProject({ name: '', description: '', color: '#3B82F6' });
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    setTasks(tasks.filter((t) => t.project_id !== projectId));
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      status: 'todo',
      project_id: selectedProject.id,
      created_by: user?.id || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium', due_date: '' });
    setIsTaskModalOpen(false);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updated_at: new Date().toISOString() }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const projectTasks = selectedProject
    ? tasks.filter((t) => t.project_id === selectedProject.id)
    : [];

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="dashboard">
      <Header />

      <main className="dashboard-main">
        {!selectedProject ? (
          <div className="projects-view">
            <div className="view-header">
              <h2>My Projects</h2>
              <button
                className="btn-primary"
                onClick={() => setIsProjectModalOpen(true)}
              >
                + New Project
              </button>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  tasks={tasks.filter((t) => t.project_id === project.id)}
                  onSelect={() => setSelectedProject(project)}
                  onDelete={() => handleDeleteProject(project.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="tasks-view">
            <div className="view-header">
              <div className="breadcrumb">
                <button
                  className="link-button"
                  onClick={() => setSelectedProject(null)}
                >
                  Projects
                </button>
                <span className="breadcrumb-separator">/</span>
                <span>{selectedProject.name}</span>
              </div>
              <button
                className="btn-primary"
                onClick={() => setIsTaskModalOpen(true)}
              >
                + New Task
              </button>
            </div>

            <div className="tasks-list">
              {projectTasks.length === 0 ? (
                <div className="empty-state">
                  <p>No tasks yet. Create your first task to get started!</p>
                </div>
              ) : (
                projectTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onUpdate={(updates) => handleUpdateTask(task.id, updates)}
                    onDelete={() => handleDeleteTask(task.id)}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </main>

      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title="Create New Project"
      >
        <form onSubmit={handleCreateProject}>
          <div className="form-group">
            <label htmlFor="project-name">Project Name</label>
            <input
              id="project-name"
              type="text"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              required
              placeholder="Enter project name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="project-description">Description</label>
            <textarea
              id="project-description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              placeholder="Enter project description"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${
                    newProject.color === color ? 'selected' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setNewProject({ ...newProject, color })}
                />
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsProjectModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Project
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Create New Task"
      >
        <form onSubmit={handleCreateTask}>
          <div className="form-group">
            <label htmlFor="task-title">Task Title</label>
            <input
              id="task-title"
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
              placeholder="Enter task title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  priority: e.target.value as Task['priority'],
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="task-due-date">Due Date</label>
            <input
              id="task-due-date"
              type="date"
              value={newTask.due_date}
              onChange={(e) =>
                setNewTask({ ...newTask, due_date: e.target.value })
              }
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsTaskModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
