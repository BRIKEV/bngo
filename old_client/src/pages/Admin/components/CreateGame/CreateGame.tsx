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
import { createGame } from '../../../../api';

interface FormValues {
  key: string;
  gameName: string;
  topics: number[];
}

const CreateGame: React.FC = () => {
  const topicList = gamesStore((state) => state.topics);
  const onFinish = async (values: FormValues) => {
    await createGame(values.key, values.gameName, values.topics);
  };
  return (
    <Form
      name="validate_other"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Game name"
        name="gameName"
        rules={[{ required: true, message: 'Please input your game!' }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        label="Game password"
        name="key"
        rules={[{ required: true, message: 'Please input your key!' }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item name="topics" label="Elige categoria">
        <Checkbox.Group>
          <Row>
            {topicList.map(topic => (
              <Col key={topic.id}>
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