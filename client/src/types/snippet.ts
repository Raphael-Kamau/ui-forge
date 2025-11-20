// src/types/snippet.ts
export interface Snippet {
  _id: string;
  title: string;
  category: string;
  framework: string;
  code: string;
  tags: string[];
  createdAt: string;
}
