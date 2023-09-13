import { Box } from "@chakra-ui/react";
import React from "react";
import { Post } from "../post/Post";
import { useParams } from "react-router-dom";
import { useGetPost } from "../../hooks/posts";
import { NewComment } from "./NewComment";
import { CommentList } from "./CommentList";

export const Comments = () => {
  const { id } = useParams();
  const {post, isLoading} = useGetPost({id});

  if(isLoading) return "Loading..."

  return (
    <Box align={"center"} pt={"50"}>
      <Post post={post}/>
      <NewComment post={post}/>
      <CommentList post={post}/>
    </Box>
  );
};
