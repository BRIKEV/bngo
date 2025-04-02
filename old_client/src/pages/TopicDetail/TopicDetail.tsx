import { useEffect, useState } from 'react';
import { Spin, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { getTopic } from '../../api';
import ImageUploader from './components/ImagesUploader/ImageUploader';

interface Topic {
  id: number;
  name: string;
  images: {
    uid: string;
    name: string;
    url: string;
  }[];
}

const TopicDetail = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  useEffect(() => {
    getTopic(+(id as string))
      .then(async (topicResponse) => {
        if (!topicResponse) {
          setTopic(null);
        } else {
          setTopic({
            id: topicResponse.id,
            name: topicResponse.name,
            images: topicResponse.images.map((image, index) => ({
              name: image.name || `image ${index}`,
              uid: image.uid,
              url: image.url,
            })),
          });
        }
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
