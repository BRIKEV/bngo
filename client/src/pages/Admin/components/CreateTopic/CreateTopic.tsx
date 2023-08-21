import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from "antd/es/upload/interface";
import {
  Button,
  Form,
  Input,
  Upload,
  Space,
} from 'antd';
import { createTopic } from '../../../../api';

const normFile = (e: UploadChangeParam) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface FormValues {
  topicName: string;
  topicImages: File[];
}

const CreateTopic: React.FC = () => {
  const onFinish = async (values: FormValues) => {
    await createTopic(values.topicName, values.topicImages);
  };

  return (
    <Form
      name="create_topic"
      onFinish={onFinish}
    >
      <Form.Item
        label="topicName"
        name="topicName"
        rules={[{ required: true, message: 'Please input your game!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="topicImages"
        label="Añadir nuevas imágenes"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          multiple
          name="logo"
          listType="picture"
          onChange={() => 0}
          beforeUpload={() => {
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Subir</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateTopic;