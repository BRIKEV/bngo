import { BoardItem } from "../BoardItem/BoardItem";
import styles from './Board.module.css';
import { sortDataBasedOnDevice } from "./utils";

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
      {sortDataBasedOnDevice(elements).map(element => (
        <div key={element.id}>
          <BoardItem hidden={!element.selected} url={element.image} />
        </div>
      ))}
    </div>
  );
};
