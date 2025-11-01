import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export function useScore() {
  const [score, setScore] = useState<number>(0);
  const user = auth.currentUser;

  // 🔹 Lấy điểm hiện tại
  useEffect(() => {
    if (!user) return;
    const fetchScore = async () => {
      const ref = doc(db, "scores", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setScore(snap.data().total || 0);
      else await setDoc(ref, { total: 0 });
    };
    fetchScore();
  }, [user]);

  // 🔹 Cập nhật điểm
  const addScore = async (points: number) => {
    if (!user) return;
    const ref = doc(db, "scores", user.uid);
    const newTotal = score + points;
    await updateDoc(ref, { total: newTotal }).catch(async () => {
      await setDoc(ref, { total: newTotal });
    });
    setScore(newTotal);
  };

  return { score, addScore };
}
