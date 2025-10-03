export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  project_id: string;
  assigned_to?: string;
  created_by: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}
