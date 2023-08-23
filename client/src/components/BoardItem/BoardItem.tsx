import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './BoardItem.module.css';

interface Props {
  hidden: boolean;
  url: string;
}

export const BoardItem = ({ hidden, url }: Props) => {
  if (hidden) {
    return (
      <div className={styles.placeholder}>
        <QuestionCircleOutlined />
      </div>
    );
  }
  return (
    <img
      className={styles.img}
      src={url}
    />
  )
};
