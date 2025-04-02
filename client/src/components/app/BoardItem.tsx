import { Card } from "@/components/ui/card";

export interface BoardItem {
  image: string;
  selected: boolean;
}

const BoardItem = ({ image, selected }: BoardItem) => {
  return (
    <Card className="w-16 h-16 flex items-center justify-center rounded-xl border">
      {!selected ? (
        <div className="w-full h-full flex items-center justify-center bg-black rounded-xl">
          <span className="text-white text-2xl font-bold">?</span>
        </div>
      ) : (
        <img src={image} alt="Bingo item" className="w-full h-full object-cover rounded-xl" />
      )}
    </Card>
  );
};

export default BoardItem;
