interface WordRowProps {
  word: string;
  guess: string;
}

export default function WordRow({ word, guess }: WordRowProps) {
  const letters = word.split("");
  return (
    <div className="flex gap-2 mb-2 justify-center">
      {letters.map((letter, i) => {
        let bg = "bg-gray-700";
        if (guess[i]) {
          if (guess[i] === letter) bg = "bg-green-500";
          else if (word.includes(guess[i])) bg = "bg-yellow-500";
          else bg = "bg-gray-500";
        }
        return (
          <div
            key={i}
            className={`w-12 h-12 flex items-center justify-center text-xl font-bold text-white rounded ${bg}`}
          >
            {guess[i] ?? ""}
          </div>
        );
      })}
    </div>
  );
}
