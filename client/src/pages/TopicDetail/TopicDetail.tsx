import { useEffect, useState } from "react";
import { getTopic } from "../../api";
import { Spin, Typography } from "antd";

import { useParams } from "react-router-dom";
import ImageUploader from "./components/ImagesUploader/ImageUploader";

const TopicDetail = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState<any | null>(null);
  useEffect(() => {
    getTopic(+(id as string))
      .then(async (topicResponse) => {
        console.log(topicResponse);
        setTopic(topicResponse);
      });
  }, [id]);

  if (!topic) return <Spin />;

  return (
    <div>
      <Typography.Paragraph>{topic.name}</Typography.Paragraph>
      <Typography.Title level={4}>Imágenes</Typography.Title>
      <ImageUploader images={topic.images} />
    </div>
  );
};

export default TopicDetail;
