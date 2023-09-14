import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
} from "@chakra-ui/react";
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import Avatar from "./Avatar";
import { useAuth } from "../../hooks/auth";
import { useUpdateAvatar } from "../../hooks/users";

export const EditProfileForm = () => {
  const { user, isLoading: authLoading } = useAuth();

  if (authLoading) return "Loading...";

  function handleChange(e) {
    // setFile(e.target.files[0]);
  }

  return (
    <Box>
        <HStack spacing={5}>
          <Avatar user={user} />
          <FormControl py="4">
            <FormLabel htmlFor="picture">Change avatar</FormLabel>
            <input type="file" accept="image/*" onChange={handleChange} />
            {/* <EditProfileForm /> */}
          </FormControl>
        </HStack>
        <Button
          colorScheme="teal"
          loadingText="Uploading"
          w={"25%"}
          my={"6"}
        //   onClick={updateAvatar}
        //   isLoading={fileLoading}
        >
          Save
        </Button>
    </Box>
  );
};
