import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Actions from "./Actions";

export const Post = ({ post }) => {
  const { text, image } = post;
  return (
    <Box p={"2"} maxW={"600px"} textAlign={"left"}>
      <Box border={"2px solid #ccc"} borderRadius={"md"}>
        <Header post={post} />

        <Box p={"2"} minH={"100px"}>
          {image && (
            <Center>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                width={"fit-content"}
                marginBottom={".5rem"}
              >
                <img src={image} alt="image" />{" "}
              </Box>
            </Center>
          )}
          <Text wordBreak={"break-word"} fontSize={["sm", "md"]}>
            {text}
          </Text>
        </Box>

        <Actions post={post} />
      </Box>
    </Box>
  );
};
