export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  coverImageKey?: string; // New field to store the reference ID
  createdAt: string;
}
