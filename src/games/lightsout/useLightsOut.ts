import { useState } from "react";

export function useLightsOut(size: number) {
  const [board, setBoard] = useState<boolean[][]>(() =>
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.random() < 0.5)
    )
  );

  const toggle = (x: number, y: number) => {
    setBoard((prev) => {
      const copy = prev.map((row) => [...row]);

      const flip = (i: number, j: number) => {
        if (i >= 0 && i < size && j >= 0 && j < size) {
          copy[i][j] = !copy[i][j];
        }
      };

      flip(x, y);
      flip(x - 1, y);
      flip(x + 1, y);
      flip(x, y - 1);
      flip(x, y + 1);

      return copy;
    });
  };

  const isWin = board.every((row) => row.every((cell) => !cell));

  const reset = () => {
    setBoard(
      Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Math.random() < 0.5)
      )
    );
  };

  return { board, toggle, isWin, reset };
}
