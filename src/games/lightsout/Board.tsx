interface BoardProps {
  board: boolean[][];
  onToggle: (x: number, y: number) => void;
}

export default function Board({ board, onToggle }: BoardProps) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${board.length}, 60px)` }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={`${i}-${j}`}
            onClick={() => onToggle(i, j)}
            className={`w-14 h-14 rounded-lg shadow-md border transition 
              ${cell ? "bg-yellow-400 hover:bg-yellow-300" : "bg-gray-800 hover:bg-gray-700"}`}
          />
        ))
      )}
    </div>
  );
}
