export type BlogStatus = 'publish' | 'pending' | 'failed';

export interface BlogType {
  id: string;
  date: string;
  slug: string;
  status: BlogStatus;
  title: string;
  number: number;
  content: string;
}

export interface BlogStatusType {
  language: string;
  targetId: string;
  sent: boolean;
}