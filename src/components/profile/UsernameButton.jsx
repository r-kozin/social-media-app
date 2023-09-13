import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";

export const UsernameButton = ({ user }) => {
  return (
    <Button
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
      variant={"link"}
      colorScheme="teal"
    >
      {user.username}
    </Button>
  );
};
