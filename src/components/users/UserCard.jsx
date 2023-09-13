import { Button, Code, Link, VStack } from "@chakra-ui/react";
import React from "react";
import Avatar from "../profile/Avatar";
import { PROTECTED } from "../../lib/routes";
import { Link as RouterLink } from "react-router-dom";

export const UserCard = ({ user }) => {
  const { id, username } = user;
  return (
    <VStack
      bg={"gray.100"}
      rounded={"md"}
      shadow={"sm"}
      textAlign={"center"}
      p={4}
      spacing={3}
    >
      <Avatar user={user} size={"xl"} />
      <Code>@{username}</Code>
      <Link>
        <Button as={RouterLink} to={`${PROTECTED}/profile/${id}`} colorScheme={"teal"} size={'sm'} variant={'link'}>View Profile</Button>
      </Link>
    </VStack>
  );
};
