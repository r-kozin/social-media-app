import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Center,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Avatar from "./Avatar";
import { useAuth, useEditProfile } from "../../hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../lib/routes";
import { useForm } from "react-hook-form";
import { usernameValidate } from "../../utils/form-validate";

export const EditProfileForm = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { pathname } = useLocation();
  const { editProfile, isLoading: editIsLoading } = useEditProfile();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!authLoading && !pathname.includes(user.id)) {
      navigate(DASHBOARD);
    }
  }, [pathname, user, authLoading]);

  if (authLoading) return "Loading...";

  async function handleEdit(data) {
    editProfile({
      username: data.username,
      uid: user.id,
      redirectTo: DASHBOARD,
    });
  }

  console.log(errors);

  return (
    <Center w={"100%"} h={"100vh"}>
      <Box
        mx={"1"}
        w={"500px"}
        maxW={"full"}
        p={"9"}
        borderWidth={"1px"}
        borderRadius={"lg"}
      >
        <Heading mb={"4"} size={"lg"} textAlign={"center"}>
          Edit Profile
        </Heading>
        <Center>
          <Avatar user={user} />
        </Center>

        <form onSubmit={handleSubmit(handleEdit)}>
          <FormControl py={"2"} isInvalid={errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="username"
              defaultValue={user.username}
              {...register("username", usernameValidate)}
            />
            <FormErrorMessage>
              {errors.username ? errors.username.message : null}
            </FormErrorMessage>
          </FormControl>
          <Button
            type={"submit"}
            colorScheme={"teal"}
            w={"full"}
            mt={"4"}
            isLoading={editIsLoading}
            loadingText={"Updating Profile"}
          >
            {" "}
            Save{" "}
          </Button>
        </form>
      </Box>
    </Center>
  );
};
