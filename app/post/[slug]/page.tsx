import { getPost } from "@/lib/storage";
import { Typography, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const { Title, Paragraph } = Typography;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article style={{ maxWidth: 800, margin: "0 auto" }}>
      <Link href="/">
        <Button type="link" style={{ paddingLeft: 0, marginBottom: 16 }}>
          ← Back to Home
        </Button>
      </Link>

      {post.coverImageKey && (
        <div
          style={{
            marginBottom: 24,
            borderRadius: 8,
            overflow: "hidden",
            maxHeight: 400,
          }}
        >
          <Image
            src={`/api/images/${post.coverImageKey}`}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      <Title>{post.title}</Title>

      <Paragraph
        style={{ fontSize: "1.1rem", whiteSpace: "pre-wrap", lineHeight: 1.6 }}
      >
        {post.content}
      </Paragraph>

      <div
        style={{ marginTop: 40, borderTop: "1px solid #eee", paddingTop: 20 }}
      >
        <Paragraph type="secondary">
          Posted on: {new Date(post.createdAt).toLocaleDateString()}
        </Paragraph>
      </div>
    </article>
  );
}
