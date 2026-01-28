import { getAllPosts } from "@/lib/storage";
import { Typography, Card } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Title } = Typography;

// Ensure this page always fetches fresh data
export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <Title level={2}>Latest Posts</Title>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {posts.map((post) => (
          <Card
            key={post.slug}
            title={post.title}
            extra={<Link href={`/post/${post.slug}`}>Read</Link>}
            cover={
              post.coverImageKey ? (
                <div style={{ height: 200, overflow: "hidden" }}>
                  <Image
                    alt="cover"
                    src={`/api/images/${post.coverImageKey}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ) : null
            }
          >
            <p>{post.content.substring(0, 100)}...</p>
            <small style={{ color: "#888" }}>
              {new Date(post.createdAt).toLocaleDateString()}
            </small>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <p>No posts found.</p>
          <Link href="/admin">Create your first post</Link>
        </div>
      )}
    </main>
  );
}
