import { BoardItem } from "../BoardItem/BoardItem";
import styles from './Board.module.scss';

interface Props {
  elements: {
    id: number;
    image: string;
    selected: boolean;
  }[];
  columns: 6 | 4;
}

export const Board = ({ elements, columns }: Props) => {
  return (
    <div
      className={`${styles.container} ${styles[`column-${columns}`]}`}
    >
      {elements.map(element => (
        <div key={element.id}>
          <BoardItem hidden={!element.selected} url={element.image} />
        </div>
      ))}
    </div>
  );
};
