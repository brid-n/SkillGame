import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";

export async function fetchGameResults() {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    collection(db, "GameResults"),
    where("userId", "==", user.uid)
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}
