import React from 'react';
import { Button, Form, Input } from 'antd';

type FieldType = {
  gameName: string;
  password: string;
  username: string;
};

const JoinGame: React.FC = () => {
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="gameName"
        name="gameName"
        rules={[{ required: true, message: 'Please input your game!' }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Acceder
        </Button>
      </Form.Item>
    </Form>
  );
};

export default JoinGame;
