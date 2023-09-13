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
import { DASHBOARD, REGISTER } from "../../lib/routes.jsx";
import { useLogin } from "../../hooks/auth.jsx";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "../../utils/form-validate.jsx";

export const Login = () => {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, reset, formState: {errors}, } = useForm();

  async function handleLogin(data) {
    const succeeded = await login({
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });

    if (succeeded) reset();
  }

  console.log(errors)

  return (
    <Center w={"100%"} h={"100vh"}>
      <Box mx={"1"} maxW={"md"} p={"9"} borderWidth={"1px"} borderRadius={"lg"}>
        <Heading mb={"4"} size={"lg"} textAlign={"center"}>
          Log In
        </Heading>

        <form onSubmit={handleSubmit(handleLogin)}>
          <FormControl isInvalid={errors.email} py={"2"}>
            <FormLabel>Email</FormLabel>
            <Input
              type={"email"}
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py={"2"}>
            <FormLabel>Password</FormLabel>
            <Input
              type={"password"}
              placeholder="password123"
              {...register("password", passwordValidate)}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <Button
            type={"submit"}
            colorScheme={"teal"}
            w={"full"}
            mt={"4"}
            isLoading={isLoading}
            loadingText={"Logging In"}
          >
            {" "}
            Log In{" "}
          </Button>
          <Text fontSize={"xlg"} align={"center"} mt={"6"}>
            Don't have an account?{" "}
            <Link
              as={RouterLink}
              to={REGISTER}
              color={"teal.800"}
              fontWeight={"medium"}
              textDecor={"underline"}
              _hover={{ background: "teal.100" }}
            >
              Register
            </Link>{" "}
            instead!
          </Text>
        </form>
      </Box>
    </Center>
  );
};
