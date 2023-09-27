import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { useAddPostImage } from "../../hooks/posts";
import Avatar from "../profile/Avatar";

export const AddImage = ({ isOpen, onClose, setPostImage, setPostImageID }) => {
  const { user, isLoading: authLoading } = useAuth();
  const {
    setFile,
    addPostImage,
    isLoading: fileLoading,
    fileURL,
  } = useAddPostImage(user?.id);

 async function handleAddPostImage(){
  try{
  const postImageURL = await addPostImage();
  console.log("Post Image URL:", postImageURL.postImageURL, "Post Image ID:", postImageURL.imageID);
  setPostImage(postImageURL.postImageURL);
  setPostImageID(postImageURL.imageID);
  onClose();
  } catch (err) {
    console.log(err);
  }
 }

  if (authLoading) return "Loading...";

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={5}>
            <Avatar user={user} />
            <FormControl py="4">
              <FormLabel htmlFor="picture">Add image</FormLabel>
              <input type="file" accept="image/*" onChange={handleChange} />
            </FormControl>
          </HStack>
          {/* preview uploaded image*/}
           {fileURL && <img src={fileURL} alt="preview" />}
          <Button
            colorScheme="teal"
            loadingText="Uploading"
            w={"full"}
            my={"6"}
            onClick={handleAddPostImage}
            isLoading={fileLoading}
          >
            Add Image
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};