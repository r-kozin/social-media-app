import { Button, Divider, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { PostList } from "../post/PostList";
import { useGetPosts } from "../../hooks/posts";
import Avatar from "./Avatar";
import { useUser } from "../../hooks/users";
import { format } from "date-fns";
import { useDisclosure } from "@chakra-ui/hooks";
import { EditProfile } from "./EditProfile";
import { useAuth } from "../../hooks/auth";

export const Profile = () => {
  const { id } = useParams();
  const { posts, isLoading: postsLoading } = useGetPosts(id);
  const { user, isLoading: userLoading } = useUser(id);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user: authUser, isLoading: authLoading } = useAuth();

  if (userLoading) return "Loading...";

  let totalLikes = 0;
  if (!postsLoading) {
    posts.forEach((post) => {
      post.likes.forEach((like) => {
        totalLikes++;
      });
    });
    console.log(totalLikes);
  }
  return (
    <Stack spacing={5}>
      <Flex p={["4", "6"]} pos={"relative"} align={"center"}>
        <Avatar size={"2xl"} user={user} />
        {!authLoading && authUser.id === user.id && (
          <Button
            pos={"absolute"}
            mb={"2"}
            right={"6"}
            top={"6"}
            colorScheme={"teal"}
            onClick={onOpen}
          >
            Change avatar
          </Button>
        )}
        <Stack ml={"10"}>
          <Text fontSize={"2xl"}>{user.username}</Text>
          <HStack spacing={"10"}>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              Posts: {postsLoading ? "Loading..." : posts.length}
            </Text>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              Likes: {totalLikes}
            </Text>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              Joined: {format(user.date, "MMMM yyyy")}
            </Text>
          </HStack>
        </Stack>
        <EditProfile isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Divider />

      {postsLoading ? (
        <Text>Posts are loading...</Text>
      ) : (
        <PostList posts={posts} />
      )}
    </Stack>
  );
};
