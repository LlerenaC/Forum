import { db } from "./firebase";

const userCollectionRef = db.collection("Questions");

export const getQuestions = async () => {
    const snapshot = await userCollectionRef.get();
    const posts = snapshot.docs.map((doc) => ({text: doc.data(), id: doc.id}));
    return posts;
  };

export const addQuestion = async (text: string) => {
    await userCollectionRef.add({text: text});
  };

export const deleteQuestion = async (id: string) => {
    const snapshot = await userCollectionRef.doc(id);
    return await snapshot.delete(); 
}