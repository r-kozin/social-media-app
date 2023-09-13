import React from "react";
import { useGetComments } from "../../hooks/comments";
import { Box } from "@chakra-ui/react";
import { Comment } from "./Comment";

export const CommentList = ({ post }) => {
  const { id } = post;
  const { comments, isLoading } = useGetComments(id);

  if (isLoading) return "Loading...";

  return (
    <Box>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment}/>
      ))}
    </Box>
  );
};
