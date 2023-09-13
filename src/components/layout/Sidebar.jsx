import { Box, Button, Code, Stack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { USERS, PROTECTED } from "../../lib/routes.jsx";
import { useAuth } from "../../hooks/auth.jsx";
import Avatar from '../profile/Avatar.jsx'

function ActiveUser() {
    const {user, isLoading} = useAuth()

    if (isLoading) {
        return <div>Loading...</div>
    }

  return (
    <Stack align={'center'} spacing={'5'} my={'8'}>
        <Avatar user={user} />
      <Code>@{user.username}</Code>
      <Button colorScheme={'teal'} width={'full'} as={Link} to={`${PROTECTED}/profile/${user.id}`}>Edit Profile</Button>
    </Stack>
  );
}

export const Sidebar = () => {
  return (
    <Box
      px={"6"}
      height={"100vh"}
      w={"100%"}
      maxW={"300px"}
      borderLeft={"1px solid"}
      borderLeftColor={"teal.100"}
      position={"sticky"}
      top={"16"}
      display={{ base: "none", md: "block" }}
    >
      <Box align={"center"}>
        <ActiveUser />
        <Box as={"ul"} borderBottom={"2px solid"} borderColor={"teal.200"} />
        <Button
          variant={"outline"}
          colorScheme={"teal"}
          as={Link}
          to={USERS}
          mt={"4"}
          size={"sm"}
        >
          ALL USERS
        </Button>
      </Box>
    </Box>
  );
};
