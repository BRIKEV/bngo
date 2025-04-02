import { cn } from "@/lib/utils";
import BoardItem from "./BoardItem";

interface BoardItemElement {
  image: string;
  selected: boolean;
  id: number;
}

interface BoardProps {
  selectable: boolean;
  columns: number;
  elements: BoardItemElement[];
}

const Board = ({ columns, elements, selectable }: BoardProps) => {
  return (
    <div className={cn("grid gap-2", `grid-cols-${columns}`)}>
      {elements.map((item, index) => (
        <BoardItem key={index} image={item.image} selected={selectable ? true : item.selected} />
      ))}
    </div>
  );
};

export default Board;