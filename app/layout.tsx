import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { Layout, Menu } from "antd";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blob Blog",
  description: "Built with Next.js & Netlify Blobs",
};

const { Header, Content, Footer } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <StyledComponentsRegistry>
          <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginRight: 20,
                  fontSize: "1.2rem",
                }}
              >
                SOFT Blog
              </div>
              <Menu
                theme="dark"
                mode="horizontal"
                selectable={false}
                items={[
                  { key: "1", label: <Link href="/">Home</Link> },
                  { key: "2", label: <Link href="/admin">Write Post</Link> },
                ]}
                style={{ flex: 1, minWidth: 0 }}
              />
            </Header>
            <Content style={{ padding: "24px 48px" }}>
              <div
                style={{
                  background: "#fff",
                  padding: 24,
                  minHeight: 380,
                  borderRadius: 8,
                  maxWidth: 1000,
                  margin: "0 auto",
                }}
              >
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              SOFT Blog © {new Date().getFullYear()}
            </Footer>
          </Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
