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
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import { uuidv4 } from "@firebase/util";
import { useToast } from "@chakra-ui/react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";


export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
      image: post.image ? post.image : null,
      imageID: post.imageID ? post.imageID : null,
    });
    // add image to images collection w/ same ID as post
    if (post.image) {
      await setDoc(doc(db, "images", id), {
        id,
        date: Date.now(),
        image: post.image,
        uid: post.uid,
        imageID: post.imageID,
      });
    }
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
    const res = window.confirm("Are you sure you want to delete this post? This will also delete any images associated with the post. Warning: This action cannot be undone.");
    if (res){
        setLoading(true);
        //delete post document
        await deleteDoc(doc(db, "posts", id));
        
        //delete comments
        async function deleteComments(docRef){
          deleteDoc(docRef)
        }
        //delete images
        async function deleteImages(docRef){
          // get image id and uid from doc
          const docSnap = await getDoc(docRef);
          const imageID = docSnap.data().imageID;
          const uid = docSnap.data().uid;
          console.log(imageID, uid)
          //delete image from cloudstore
          const imageRef = ref(storage, "postImages/" + uid + "/" + imageID);
          console.log(imageRef)
          await deleteObject(imageRef)
          //delete image document
          deleteDoc(docRef)
        }

        const q = query(collection(db, "comments"), where("postID", "==", id));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => deleteComments(doc.ref))

        //delete image associated with post
        const q2 = query(collection(db, "images"), where("id", "==", id));
        const querySnapshot2 = await getDocs(q2)
        querySnapshot2.forEach(doc => deleteImages(doc.ref))
        
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

export function useAddPostImage(uid) {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addPostImage() {
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
    const imageID = uuidv4();
    const fileRef = ref(storage, "postImages/" + uid + "/" + imageID);
    await uploadBytes(fileRef, file);

    // get image url
    const postImageURL = await getDownloadURL(fileRef); //get url for file

    // function to add image document to images collection
    // await setDoc(doc(db, "images", id), {
    //   id,
    //   date: Date.now(),
    //   image: postImageURL,
    //   uid,
    // });

    toast({
      title: "Image uploaded",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    setLoading(false);
    setFile(null);
    return {postImageURL, imageID};
  }

  return {
    setFile,
    addPostImage,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}
