import React from "react";
import { Box, Button, HStack, Heading, Textarea, IconButton } from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useAddPost, useGetPosts } from "../../hooks/posts";
import { useAuth } from "../../hooks/auth";
import { PostList } from "../post/PostList";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useDisclosure } from "@chakra-ui/hooks";
import { AddImage } from "./AddImage";


function NewPost() {
  const {register, handleSubmit, reset} = useForm();
  const {addPost, isLoading: addingPost} = useAddPost();
  const {user, isLoading: authLoading} = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [postImage, setPostImage] = React.useState(null);
  const [postImageID, setPostImageID] = React.useState(null);

  function handleCloseModal() {
    onClose();
  }
  
  function setPostImageURL(url) {
    if (!url) {
      return;
    }
    setPostImage(url);
  }

  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
      image: postImage,
      imageID: postImageID,
    })
    console.log(postImage);
    setPostImage(null);
    reset();
  }
  return (
    <Box maxW={"600px"} mx={"auto"} py={"10"}>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify={'space-between'}>
          <Heading size={"lg"}>New Post</Heading>
          <Button colorScheme={"teal"} type="submit" isLoading={authLoading || addingPost} loadingText={'Loading...'}>Post</Button>
        </HStack>
        <Textarea as={TextareaAutosize} placeholder={"What's on your mind?"} resize={'none'} mt={'5'} minRows={'3'} {...register("text", {required: true})}/>
        {postImage && (
          <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                width={"fit-content"}
                marginTop={".5rem"}
              ><img src={postImage} alt="preview" /></Box>)}
        <IconButton
          ml={"auto"}
          size="md"
          colorScheme="teal"
          variant={"ghost"}
          icon={<HiOutlinePhotograph />}
          isRound
          onClick={onOpen}
          isDisabled={postImage}
          // isLoading={deleteLoading || userLoading}
        />
      </form>
      <AddImage isOpen={isOpen} onClose={handleCloseModal} setPostImage={setPostImageURL} setPostImageID={setPostImageID}/>
    </Box>
  );
}

export const Dashboard = () => {
  const {posts, isLoading: postsLoading} = useGetPosts();
  if (postsLoading) { // instead of {postsLoading ? "Loading..." : <PostList posts={posts}/>}
    return <div>Loading posts...</div>
  }
return (
  <>
    <NewPost />
    <PostList posts={posts}/>
  </>
)
}
