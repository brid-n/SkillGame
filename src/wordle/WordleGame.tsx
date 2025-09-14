import { useEffect, useState } from "react";
import { WORDS } from "./words";
import WordRow from "./WordRow";
import Keyboard from "./Keyboard";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WordleGame() {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  const handleKey = (key: string) => {
    if (key === "enter") {
      if (currentGuess.length === word.length) {
        setGuesses([...guesses, currentGuess]);
        setCurrentGuess("");
      }
    } else if (key === "backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-z]$/.test(key) && currentGuess.length < word.length) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const isWin = guesses.includes(word);
  const isLose = guesses.length >= 6 && !isWin;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Wordle Puzzle</h1>

      {Array.from({ length: 6 }).map((_, i) => (
        <WordRow
          key={i}
          word={word}
          guess={guesses[i] ?? (i === guesses.length ? currentGuess : "")}
        />
      ))}

      <Keyboard onKey={handleKey} />

      {isWin && <p className="mt-4 text-green-400">🎉 You Win!</p>}
      {isLose && <p className="mt-4 text-red-400">😢 You Lose! Word: {word}</p>}

      <button
        onClick={() => navigate("/games")}
        className="absolute top-6 left-6 bg-white text-black px-4 py-2 rounded"
      >
        <ArrowLeft className="inline-block mr-1" /> Back
      </button>
    </div>
  );
}
