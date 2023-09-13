import {
  setDoc,
  doc,
  query,
  collection,
  where,
  orderBy,
  deleteDoc
} from "firebase/firestore";
import { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { useToast } from "@chakra-ui/react";
import { db } from "../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useAddComment({ postID, uid }) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addComment(text) {
    setLoading(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, { text, id, postID, date, uid });
    toast({
      title: "Comment added successfully!",
      status: "success",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
    setLoading(false);
  }

  return { addComment, isLoading };
}

export function useGetComments(postID) {
  const q = query(
    collection(db, "comments"),
    where("postID", "==", postID),
    orderBy("date", "asc")
  );
  const [comments, isLoading, error] = useCollectionData(q);

  if (error) {
    throw error;
  }
  return { comments, isLoading };
}

export function useDeleteComment(id) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deleteComment() {
    const res = window.confirm("Are you sure you want to delete this comment?");

    if (res) {
      setLoading(true);
      const commentRef = doc(db, "comments", id);
      await deleteDoc(commentRef);
      toast({
        title: "Comment deleted!",
        status: "info",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  }

  return { deleteComment, isLoading };
}
