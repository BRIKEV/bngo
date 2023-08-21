import React, { useEffect, useState } from "react";
import { getTopics } from "../../../../api";
import { Typography } from "antd";

import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { supabase } from "../../../../supabase/client";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Image {
  uid: string;
  name: string;
  url: string;
}

interface Props {
  images: Image[];
}

const App: React.FC<Props> = ({ images }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(images);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file, event }) =>{
    console.log(file, event);
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => {
          return false;
        }}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};


const ListTopics = () => {
  const [topicList, setTopics] = useState<any[]>([]);
  useEffect(() => {
    getTopics()
      .then(async (topics: any[]) => {
        console.log(topics);
        for (const topic of topics) {
          const URLS = topic.images.map(image => image.url);
          const { data: tmpUrls } = await supabase
            .storage
            .from('topics')
            .createSignedUrls(URLS, 60);
          const mapTopic = {
            ...topic,
            images: topic.images.map((image, index) => {
              return {
                uid: image.id.toString(),
                name: image.name,
                url: tmpUrls[index].signedUrl,
              };
            })
          }
          setTopics([...topicList, mapTopic]);
        }
      });
  }, []);
  return (
    <div>
      {topicList.map(topic => (
        <div key={topic.id}>
          <Typography.Paragraph>{topic.name}</Typography.Paragraph>
          <Typography.Title level={4}>Imágenes</Typography.Title>
          <App images={topic.images} />
        </div>
      ))}
    </div>
  );
};

export default ListTopics;
