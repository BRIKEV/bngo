import { BoardItem } from "../BoardItem/BoardItem";
import styles from './Board.module.css';

interface Props {
  elements: {
    id: number;
    image: string;
    selected: boolean;
  }[];
  columns: number;
}

export const Board = ({ elements, columns }: Props) => {
  return (
    <div
      className={styles.container}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(150px, 200px))`,
        gridTemplateRows: `repeat(${columns},  minmax(150px, 200px))`
      }}
    >
      {elements.map(element => (
        <div key={element.id}>
          <BoardItem hidden={!element.selected} url={element.image} />
        </div>
      ))}
    </div>
  );
};
