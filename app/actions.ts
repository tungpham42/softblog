"use server";

import { createPost, uploadImage } from "@/lib/storage";
import { BlogPost } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("coverImage") as File | null;

  // Create a URL-friendly slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  let coverImageKey = undefined;

  // Handle Image Upload if present
  if (imageFile && imageFile.size > 0) {
    coverImageKey = `${slug}-${Date.now()}`;
    await uploadImage(coverImageKey, imageFile);
  }

  const newPost: BlogPost = {
    slug,
    title,
    content,
    coverImageKey,
    createdAt: new Date().toISOString(),
  };

  await createPost(newPost);

  revalidatePath("/");
  redirect("/");
}
