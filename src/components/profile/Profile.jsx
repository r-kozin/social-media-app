import { Divider, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { PostList } from "../post/PostList";
import { useGetPosts } from "../../hooks/posts";
import Avatar from "./Avatar";
import { useUser } from "../../hooks/users";
import { format } from "date-fns";


export const Profile = () => {

    const {id} = useParams();
    const {posts, isLoading: postsLoading} = useGetPosts(id);
    const {user, isLoading: userLoading} = useUser(id)

    if(userLoading) return "Loading..."

  return (
    <Stack spacing={5}>
      <Flex p={["4", "6"]} pos={"relative"} align={"center"}>
        <Avatar size={"2xl"} user={user} />
        <Stack ml={"10"}>
          <Text fontSize={'2xl'}>{user.username}</Text>
          <HStack spacing={"10"}>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              Posts: {posts.length}
            </Text>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              Likes: todo!
            </Text>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              Joined: {format(user.date, "MMMM yyyy")}
            </Text>
          </HStack>
        </Stack>
      </Flex>
      <Divider />

      {postsLoading ? <Text>Posts are loading...</Text> : <PostList posts={posts}/>}
    </Stack>
  );
};
