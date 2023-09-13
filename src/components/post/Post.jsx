import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Actions from "./Actions";

export const Post = ({ post }) => {
  const {text} = post;
  return (
    <Box p={"2"} maxW={"600px"} textAlign={'left'}>
      <Box border={"2px solid #ccc"} borderRadius={"md"}>
        <Header post={post}/>

        <Box p={"2"} minH={"100px"}>
          <Text wordBreak={"break-word"} fontSize={["sm", "md"]}>
            {text}
          </Text>
        </Box>

        <Actions post = {post}/>
      </Box>
    </Box>
  );
};
