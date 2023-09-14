import { doc, query, updateDoc, collection } from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function useUser(id) {
  const q = query(doc(db, "users", id));
  const [user, isLoading] = useDocumentData(q);

  return { user, isLoading };
}

export function useUpdateAvatar(uid) {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function updateAvatar() {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      console.log("No file selected");
      return;
    }

    setLoading(true);

    // Upload file to storage
    const fileRef = ref(storage, "avatars/" + uid);
    await uploadBytes(fileRef, file);

    // Update user's avatar
    const avatarURL = await getDownloadURL(fileRef); //get url for file
    const userRef = doc(db, "users", uid); // get user doc
    await updateDoc(userRef, { avatar: avatarURL }); // update user doc

    toast({
      title: "Profile updated",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    setLoading(false);
    navigate(0);
  }

  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}

export function useGetAllUsers() {
  const [users, isLoading] = useCollectionData(collection(db, "users"));

  return { users, isLoading };
}
