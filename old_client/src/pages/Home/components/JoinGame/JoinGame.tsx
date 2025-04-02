import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { joinGame } from '../../../../api';
import { setAccess } from '../../../../persistence/access';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  gameName: string;
  key: string;
  username: string;
};

const JoinGame: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    const response = await joinGame(values.key, values.username, values.gameName);
    setAccess(response.data.accessKey);
    navigate('/game');
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="Game name"
        name="gameName"
        rules={[{ required: true, message: 'Please input your game!' }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item<FieldType>
        label="Game password"
        name="key"
        rules={[{ required: true, message: 'Please input your key!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Your username"
        name="username"
        rules={[{ required: true, max: 40, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Acceder a partida
        </Button>
      </Form.Item>
      <Form.Item>
        <Link to="/admin">
          <Button type="default" htmlType="button" block>
            Crear una partida
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default JoinGame;
