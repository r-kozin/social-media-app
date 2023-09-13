import { useState } from "react";
import { doc, setDoc, query, collection, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { uuidv4 } from "@firebase/util";
import { useToast } from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";

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
