import React from 'react';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
} from 'antd';

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
};

const CreateGame: React.FC = () => (
  <Form
    name="validate_other"
    onFinish={onFinish}
  >
    <Form.Item
      label="gameName"
      name="gameName"
      rules={[{ required: true, message: 'Please input your game!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      label="username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item name="checkbox-group" label="Checkbox.Group">
      <Checkbox.Group>
        <Row>
          <Col span={8}>
            <Checkbox value="A">
              A
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="B">
              B
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="C">
              C
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="D">
              D
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="E">
              E
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="F">
              F
            </Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
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

export default CreateGame;