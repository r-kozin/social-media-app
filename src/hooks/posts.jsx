import { useState } from "react";
import { doc, setDoc, query, collection, orderBy, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "../lib/firebase";
import { uuidv4 } from "@firebase/util";
import { useToast } from "@chakra-ui/react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
    toast({
      title: "Post added successfully!",
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
    setLoading(false);
  }
  return { addPost, isLoading };
}

export function useGetPosts() {
  const q = query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);

  if (error) {
    throw error;
  }
  return { posts, isLoading };
}

export function useToggleLike({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    })
    setLoading(false);
  }
  return {toggleLike, isLoading}
}

export function useDeletePost({id}) {
  const [isLoading, setLoading] = useState(false);

  async function deletePost() {}

  return {deletePost, isLoading}
}

export function useGetPost({id}) {
  const q = doc(db, "posts", id)
  const [post, isLoading] = useDocumentData(q)

  return {post, isLoading}
}
