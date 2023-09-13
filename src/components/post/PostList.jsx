import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Post } from "./Post";

export const PostList = ({ posts }) => {
  return (
    <Box px={"4"} align={'center'}>
      {posts.length === 0 ? (
        <Text fontSize={"xl"} textAlign={"center"}>
          No posts yet... Anybody here?
        </Text>
      ) : (
        posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
};
