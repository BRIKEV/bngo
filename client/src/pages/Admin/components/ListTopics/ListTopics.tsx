import { Button, Typography } from "antd";
import { FileImageOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import gamesStore from "../../../../store/topics";

const ListTopics = () => {
  const topicList = gamesStore((state) => state.topics);
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
