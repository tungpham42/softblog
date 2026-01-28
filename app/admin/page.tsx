"use client";

import { submitPost } from "@/app/actions";
import { Button, Form, Input, Typography, message, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title } = Typography;
const { TextArea } = Input;

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  interface PostFormValues {
    title: string;
    content: string;
  }

  const handleFinish = async (values: PostFormValues) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    if (fileList.length > 0) {
      const file = fileList[0]?.originFileObj;
      if (file) {
        formData.append("coverImage", file as Blob);
      }
    }

    try {
      await submitPost(formData);
    } catch (error) {
      console.error(error);
      message.error("Failed to create post");
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: () => setFileList([]),
    beforeUpload: (file: File) => {
      const uploadFile: UploadFile = {
        uid: String(Date.now()),
        name: file.name,
        status: "done",
        originFileObj: file as unknown as UploadFile["originFileObj"],
      };
      setFileList([uploadFile]);
      return false; // Prevent auto upload
    },
    fileList,
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Title level={2}>Create New Post</Title>
      <Form layout="vertical" onFinish={handleFinish} requiredMark="optional">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input a title!" }]}
        >
          <Input placeholder="My Awesome Blog Post" size="large" />
        </Form.Item>

        <Form.Item label="Cover Image">
          <Upload {...uploadProps} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Select Cover Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please input content!" }]}
        >
          <TextArea rows={8} placeholder="Write something amazing..." />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Publish Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
