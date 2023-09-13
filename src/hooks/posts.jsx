import { useState } from "react";
import {
  doc,
  setDoc,
  query,
  collection,
  orderBy,
  updateDoc,
  arrayRemove,
  arrayUnion,
  where,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { uuidv4 } from "@firebase/util";
import { useToast } from "@chakra-ui/react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

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

export function useGetPosts(uid = null) {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
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
    });
    setLoading(false);
  }
  return { toggleLike, isLoading };
}

export function useDeletePost({ id }) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deletePost() {
    const res = window.confirm("Are you sure you want to delete this post?");
    if (res){
        setLoading(true);
        //delete post document
        await deleteDoc(doc(db, "posts", id));
        //delete comments

        async function deleteComments(docRef){
          deleteDoc(docRef)
        }

        const q = query(collection(db, "comments"), where("postID", "==", id));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => deleteComments(doc.ref))
        
        toast({
          title: "Post deleted successfully!",
          status: "info",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        setLoading(false);
    }

  }

  return { deletePost, isLoading };
}

export function useGetPost({ id }) {
  const q = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(q);

  return { post, isLoading };
}
