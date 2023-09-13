import { Divider, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { PostsList } from "../posts/PostsList";


export const Profile = () => {

    const {id} = useParams();



  return (
    <Stack spacing={5}>
      <Flex p={["4", "6"]} pos={"relative"} align={"center"}>
        Insert Avatar Here (size 2xl)
        <Stack ml={"10"}>
          @username Here
          <HStack spacing={"10"}>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              Posts: 10
            </Text>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              Likes: todo!
            </Text>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              Joined: Jan 01 2022
            </Text>
          </HStack>
        </Stack>
      </Flex>
      <Divider />
      <PostsList />
    </Stack>
  );
};
