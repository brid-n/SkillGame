import type { TileState } from "./types";

interface TileProps {
  state: TileState;
  onClick: () => void;
}

export default function Tile({ state, onClick }: TileProps) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 rounded border transition-colors
        ${state.lit ? "bg-yellow-400" : "bg-gray-800"}
        hover:ring-2 hover:ring-white`}
    />
  );
}
