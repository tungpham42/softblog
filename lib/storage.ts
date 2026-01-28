import { getStore } from "@netlify/blobs";
import { BlogPost } from "./types";

// We use two separate stores: one for post metadata/content, one for image files
const postStore = getStore("posts");
const imageStore = getStore("images");

/* --- Image Handling --- */

export async function uploadImage(key: string, file: File) {
  const arrayBuffer = await file.arrayBuffer();
  await imageStore.set(key, arrayBuffer);
}

export async function getImage(key: string): Promise<ReadableStream | null> {
  const blob = await imageStore.get(key, { type: "stream" });
  return blob as ReadableStream | null;
}

/* --- Post Handling --- */

export async function createPost(post: BlogPost) {
  await postStore.setJSON(post.slug, post);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const post = await postStore.get(slug, { type: "json" });
  return post as BlogPost | null;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { blobs } = await postStore.list();

  // Fetch posts in parallel
  const posts = await Promise.all(
    blobs.map(async (blob) => {
      return (await postStore.get(blob.key, { type: "json" })) as BlogPost;
    }),
  );

  // Sort by newest first
  return posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
