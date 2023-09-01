import { useState } from 'react';
import { QuestionCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import styles from './BoardItem.module.scss';

interface Props {
  hidden: boolean;
  url: string;
}

export const BoardItem = ({ hidden, url }: Props) => {
  const [clicked, setClicked] = useState(false);
  if (hidden) {
    return (
      <div className={styles.placeholder}>
        <QuestionCircleOutlined />
      </div>
    );
  }
  return (
    <div
      className={styles.container}
      role="button"
      tabIndex={0}
      onClick={() => setClicked(!clicked)}
    >
      <div className={`${styles.marker} ${!clicked ? styles.hide : ''}`}>
        <CheckCircleTwoTone twoToneColor="#1a8641" />
      </div>
      <img
        className={styles.img}
        src={url}
      />
    </div>
  )
};
