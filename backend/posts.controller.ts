import { db } from "./firebase";

const userCollectionRef = db.collection("Posts");

export const getPosts = async () => {
    const snapshot = await userCollectionRef.get();
    const posts = snapshot.docs.map((doc) => ({text: doc.data(), id: doc.id}));
    return posts;
  };

export const addPost = async (text: string, photoURL: string, userName: string) => {
    await userCollectionRef.add({text: text, photoURL: photoURL, userName: userName});
  };

export const deletePost = async (id: string) => {
    const snapshot = await userCollectionRef.doc(id);
    return await snapshot.delete(); 
}

export const documentID = async () => {
  return await userCollectionRef.get();
}

export const getID = async () => {
  const snapshot = await userCollectionRef.get();
  const posts = snapshot.docs.map((doc) => doc.id);
};
