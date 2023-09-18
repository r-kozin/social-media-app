import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentAlt,
  FaCommentAlt,
  FaTrash,
} from "react-icons/fa";
import { useAuth } from "../../hooks/auth";
import { useToggleLike, useDeletePost } from "../../hooks/posts";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";
import { useGetComments } from "../../hooks/comments";

export default function Actions({ post }) {
  const { id, likes, uid } = post;
  const { user, isLoading: userLoading } = useAuth();
  const isLiked = likes.includes(user?.id);
  const config = {
    id,
    isLiked,
    uid: user?.id,
  };

  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  const { deletePost, isLoading: deleteLoading } = useDeletePost({ id });
  const { comments, isLoading: commentLoading } = useGetComments(id);

  return (
    <Flex p={"2"} borderTop={"2px solid #ccc"}>
      {/* <LikeButton /> */}
      <Flex alignItems={"center"}>
        <IconButton
          size="md"
          colorScheme="red"
          variant={"ghost"}
          icon={isLiked ? <FaHeart /> : <FaRegHeart />}
          isRound
          onClick={toggleLike}
          isLoading={likeLoading || userLoading}
        />
        {likes.length}
      </Flex>
      {/* <CommentButton /> */}
      <Flex alignItems={"center"} ml={"2"}>
        <IconButton
          as={Link}
          to={`${PROTECTED}/comments/${id}`} // /comments/:id => /comments/123 || using as Link to instead of onClick
          size="md"
          colorScheme="teal"
          variant={"ghost"}
          icon={comments?.length === 0 ? <FaRegCommentAlt /> : <FaCommentAlt />}
          isRound
          isLoading={commentLoading || userLoading}
        />
        {comments?.length}
      </Flex>
      {/* <ShareButton /> */}
      {/* <DeleteButton /> */}
      {!userLoading && user.id === uid && (
        <IconButton
          ml={"auto"}
          size="md"
          colorScheme="red"
          variant={"ghost"}
          icon={<FaTrash />}
          isRound
          onClick={deletePost}
          isLoading={deleteLoading || userLoading}
        />
      )}
    </Flex>
  );
}
