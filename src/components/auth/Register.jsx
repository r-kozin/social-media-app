import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { DASHBOARD, LOGIN } from "../../lib/routes.jsx";
import { useRegister } from "../../hooks/auth.jsx";
import { useForm } from "react-hook-form";
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from "../../utils/form-validate.jsx";

export const Register = () => {
  const { register: signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleRegister(data) {
    signup({
      email: data.email,
      password: data.password,
      username: data.username,
      redirectTo: DASHBOARD,
    });
  }

  console.log(errors);

  return (
    <Center w={"100%"} h={"100vh"}>
      <Box mx={"1"} maxW={"md"} p={"9"} borderWidth={"1px"} borderRadius={"lg"}>
        <Heading mb={"4"} size={"lg"} textAlign={"center"}>
          Register
        </Heading>

        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl isInvalid={errors.username} py={"2"}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="username"
              {...register("username", usernameValidate)}
            />
            <FormErrorMessage>
              {errors.username ? errors.username.message : null}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} py={"2"}>
            <FormLabel>Email</FormLabel>
            <Input
              type={"email"}
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            />
            <FormErrorMessage>
              {errors.email ? errors.email.message : null}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py={"2"}>
            <FormLabel>Password</FormLabel>
            <Input
              type={"password"}
              placeholder="password123"
              {...register("password", passwordValidate)}
            />
            <FormErrorMessage>
              {errors.password ? errors.password.message : null}
            </FormErrorMessage>
          </FormControl>
          <Button
            type={"submit"}
            colorScheme={"teal"}
            w={"full"}
            mt={"4"}
            isLoading={isLoading}
            loadingText={"Signing up"}
          >
            {" "}
            Register{" "}
          </Button>
          <Text fontSize={"xlg"} align={"center"} mt={"6"}>
            Already have an account?{" "}
            <Link
              as={RouterLink}
              to={LOGIN}
              color={"teal.800"}
              fontWeight={"medium"}
              textDecor={"underline"}
              _hover={{ background: "teal.100" }}
            >
              Log In
            </Link>{" "}
            instead!
          </Text>
        </form>
      </Box>
    </Center>
  );
};
