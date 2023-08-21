import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { FileImageOutlined } from '@ant-design/icons';
import { getTopics } from "../../../../api";
import { Link } from "react-router-dom";

const ListTopics = () => {
  const [topicList, setTopics] = useState<any[]>([]);
  useEffect(() => {
    getTopics()
      .then(async (topics: any[]) => {
        console.log(topics);
        setTopics(topics);
      });
  }, []);
  return (
    <div>
      {topicList.map(topic => (
        <div key={topic.id}>
          <Typography.Paragraph>{topic.name}</Typography.Paragraph>
          <div>
            <Typography.Paragraph>
              {topic.images.length} <FileImageOutlined />
            </Typography.Paragraph>
            <Link to={`/admin/topics/${topic.id}`}>
              <Button type="primary">Editar</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTopics;
