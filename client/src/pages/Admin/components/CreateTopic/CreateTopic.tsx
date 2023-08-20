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

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
};

const normFile = (e: UploadChangeParam) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CreateTopic: React.FC = () => (
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
      name="upload"
      label="Upload"
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
        <Button icon={<UploadOutlined />}>Click to upload</Button>
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

export default CreateTopic;