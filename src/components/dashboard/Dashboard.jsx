import React from "react";
import { Box, Button, HStack, Heading, Textarea } from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useAddPost, useGetPosts } from "../../hooks/posts";
import { useAuth } from "../../hooks/auth";
import { PostList } from "../post/PostList";

function NewPost() {
  const {register, handleSubmit, reset} = useForm();
  const {addPost, isLoading: addingPost} = useAddPost();
  const {user, isLoading: authLoading} = useAuth();

  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
    })
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
      </form>
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
