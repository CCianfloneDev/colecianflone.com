import type { ReactNode } from 'react';
import type { BlogMeta } from './blog';

export interface LayoutProps {
  children: ReactNode;
}

export interface BlogContextProps {
  children: ReactNode;
}

export interface BlogContextType {
  posts: BlogMeta[];
  loading: boolean;
  error: Error | null;
}

export interface BlogListProps {
  posts: BlogMeta[];
}

export interface BlogPostProps {
  post: BlogMeta;
  content: string;
  onBack: () => void;
}

export interface NavBarProps {
  className?: string;
}

export interface AboutSectionProps {
  className?: string;
}