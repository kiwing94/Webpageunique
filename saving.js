import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore();

async function savePost(content, author = "Anonymous") {
  try {
    await addDoc(collection(db, "posts"), {
      author,
      content,
      timestamp: serverTimestamp()
    });
    alert("Ditt inlägg har sparats!");
  } catch (e) {
    console.error("Fel vid sparning:", e);
  }
}
