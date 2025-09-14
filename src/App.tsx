import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GameMenu from "./pages/GameMenu";
import BulletHell from "./games/BulletHell";
import WordleGame from "./wordle/WordleGame";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="games" element={<GameMenu />} />
        <Route path="games/bullet-hell" element={<BulletHell />} />
        <Route path="/games/logic-puzzle" element={<WordleGame />} />
      </Route>
    </Routes>
  );
}
