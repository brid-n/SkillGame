interface KeyboardProps {
  onKey: (key: string) => void;
}

const KEYS = [
  "QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM"
];

export default function Keyboard({ onKey }: KeyboardProps) {
  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      {KEYS.map((row, r) => (
        <div key={r} className="flex gap-2">
          {row.split("").map((k) => (
            <button
              key={k}
              onClick={() => onKey(k.toLowerCase())}
              className="w-10 h-12 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              {k}
            </button>
          ))}
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onKey("enter")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Enter
        </button>
        <button
          onClick={() => onKey("backspace")}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
