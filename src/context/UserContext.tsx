import { createContext, useContext, useState, ReactNode } from 'react';
import { Application } from '../data/applications';

interface UserGitConfig {
  id: string;
  provider: 'gitlab' | 'github';
  url: string;
  token: string;
  organization: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
}

interface UserLLMConfig {
  provider: 'openai' | 'anthropic' | 'ollama' | 'custom';
  model: string;
  apiKey: string;
  endpoint: string;
  temperature: number;
  maxTokens: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  team: string;
  avatar?: string;
  applications: Application[];
  gitConfigs: UserGitConfig[];
  llmConfig: UserLLMConfig;
  preferences: {
    theme: 'light' | 'dark';
    language: 'fr' | 'en';
    notifications: boolean;
  };
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (user: User | null) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  addUserApplication: (app: Application) => void;
  updateUserApplication: (appId: string, updates: Partial<Application>) => void;
  deleteUserApplication: (appId: string) => void;
  addUserGitConfig: (config: UserGitConfig) => void;
  updateUserGitConfig: (configId: string, updates: Partial<UserGitConfig>) => void;
  deleteUserGitConfig: (configId: string) => void;
  updateUserLLMConfig: (config: Partial<UserLLMConfig>) => void;
}

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@company.com',
    role: 'admin',
    team: 'Platform',
    applications: [], // Will be populated from global data
    gitConfigs: [
      {
        id: 'git-1',
        provider: 'gitlab',
        url: 'https://gitlab.internal.company.com',
        token: 'glpat-xxxxxxxxxxxxxxxxxxxx',
        organization: 'platform-team',
        status: 'connected',
        lastSync: '2026-01-15 11:30'
      }
    ],
    llmConfig: {
      provider: 'openai',
      model: 'gpt-4-turbo',
      apiKey: 'sk-xxxxxxxxxxxxxxxxxxxx',
      endpoint: 'https://api.openai.com/v1',
      temperature: 0.7,
      maxTokens: 2000
    },
    preferences: {
      theme: 'light',
      language: 'fr',
      notifications: true
    }
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@company.com',
    role: 'user',
    team: 'Identity',
    applications: [],
    gitConfigs: [],
    llmConfig: {
      provider: 'anthropic',
      model: 'claude-3-sonnet',
      apiKey: '',
      endpoint: 'https://api.anthropic.com',
      temperature: 0.5,
      maxTokens: 1500
    },
    preferences: {
      theme: 'light',
      language: 'fr',
      notifications: true
    }
  }
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUsers[0]);

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(users.map(u => u.id === userId ? { ...u, ...updates } : u));
    if (currentUser?.id === userId) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  const addUserApplication = (app: Application) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, applications: [...currentUser.applications, app] };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  const updateUserApplication = (appId: string, updates: Partial<Application>) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      applications: currentUser.applications.map(app => 
        app.id === appId ? { ...app, ...updates } : app
      )
    };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  const deleteUserApplication = (appId: string) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      applications: currentUser.applications.filter(app => app.id !== appId)
    };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  const addUserGitConfig = (config: UserGitConfig) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, gitConfigs: [...currentUser.gitConfigs, config] };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  const updateUserGitConfig = (configId: string, updates: Partial<UserGitConfig>) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      gitConfigs: currentUser.gitConfigs.map(c => 
        c.id === configId ? { ...c, ...updates } : c
      )
    };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  const deleteUserGitConfig = (configId: string) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      gitConfigs: currentUser.gitConfigs.filter(c => c.id !== configId)
    };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  const updateUserLLMConfig = (config: Partial<UserLLMConfig>) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      llmConfig: { ...currentUser.llmConfig, ...config }
    };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      users,
      setCurrentUser,
      updateUser,
      addUserApplication,
      updateUserApplication,
      deleteUserApplication,
      addUserGitConfig,
      updateUserGitConfig,
      deleteUserGitConfig,
      updateUserLLMConfig
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
