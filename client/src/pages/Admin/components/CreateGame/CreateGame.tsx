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
import gamesStore from '../../../../store/topics';

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
};

const CreateGame: React.FC = () => {
  const topicList = gamesStore((state) => state.topics);
  return (
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
  
      <Form.Item name="checkbox-group" label="Elige cateogria">
        <Checkbox.Group>
          <Row>
            {topicList.map(topic => (
              <Col key={topic.id} span={8}>
                <Checkbox value={topic.id}>
                  {topic.name}
                </Checkbox>
              </Col>
            ))}
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
};


export default CreateGame;