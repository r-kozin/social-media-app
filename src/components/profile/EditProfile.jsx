import {
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

export const EditProfile = ({ isOpen, onClose }) => {
  const { user, isLoading: authLoading } = useAuth();
  const {setFile, updateAvatar, isLoading: fileLoading, fileURL} = useUpdateAvatar(user?.id)

  if (authLoading) return "Loading...";

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={5}>
            <Avatar user={user} overrideAvatar={fileURL} />
            <FormControl py="4">
              <FormLabel htmlFor="picture">Change avatar</FormLabel>
              <input type="file" accept="image/*" onChange={handleChange} />
              {/* <EditProfileForm /> */}
            </FormControl>
          </HStack>
          <Button
            colorScheme="teal"
            loadingText="Uploading"
            w={"full"}
            my={"6"}
            onClick={updateAvatar}
            isLoading={fileLoading}
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
