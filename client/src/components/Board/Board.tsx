import { BoardItem } from "../BoardItem/BoardItem";
import styles from './Board.module.scss';

interface Props {
  elements: {
    id: number;
    image: string;
    selected: boolean;
  }[];
  columns: 6 | 4;
  selectable: boolean;
}

export const Board = ({ elements, columns, selectable }: Props) => {
  return (
    <div
      className={`${styles.container} ${styles[`column-${columns}`]}`}
    >
      {elements.map(element => (
          <BoardItem
            key={element.id}
            hidden={!element.selected}
            url={element.image}
            selectable={selectable}
          />
      ))}
    </div>
  );
};
