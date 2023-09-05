import { useState } from "react";
import useSignIn from "react-auth-kit/dist/hooks/useSignIn";
import { BiSolidUser } from "react-icons/bi";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService, { User } from "../../services/user-service";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  FormControl,
  FormErrorMessage,
  VStack,
  Box,
  Text,
  Link,
} from "@chakra-ui/react";

/**
 * A page component, where users can input their login credentials.
 * Redirects to "/" after successful login.
 * Uses react-auth-kit package for authentication.
 * @returns Login-Page component
 * @author Kevin Friedrichs
 */
const PageLogin = () => {
  const { t } = useTranslation();

  const schema = z.object({
    username: z
      .string()
      .min(1, { message: t("loginPageErrorUsernameRequired") }),
    password: z
      .string()
      .min(1, { message: t("loginPageErrorPasswordRequired") }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  /**
   * Send login credentials to backend for confirmation.
   * Sign in on success, or display error on failure.
   * @param data Input-Form data (username, password)
   */
  const onSubmit = (data: FieldValues) => {
    const { request } = userService.get<User>(data.username, data.password);
    request
      .then((res) => {
        signIn({
          token: res.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            id: res.data.id,
            username: res.data.username,
          },
        });
        navigate("/");
      })
      .catch((err) => {
        setError(t("loginPageError-" + err.response.status));
      });
  };

  return (
    <Box bg="gray.100" minHeight="calc(100vh - 60px)">
      <Center>
        <Box
          w="500px"
          bg="white"
          marginTop={10}
          paddingY="70px"
          borderRadius={20}
        >
          <Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={2}>
                <FormControl isInvalid={errors.username ? true : false}>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder={t("loginPageInputPlaceholderUsername")}
                      {...register("username")}
                    />
                    <InputLeftElement>
                      <BiSolidUser size={20} color="gray" />
                    </InputLeftElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password ? true : false}>
                  <InputGroup>
                    <Input
                      type="password"
                      placeholder={t("loginPageInputPlaceholderPassword")}
                      {...register("password")}
                    />
                    <InputLeftElement>
                      <FaKey size={16} color="gray" />
                    </InputLeftElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <Text fontSize={"sm"} color="red.500">
                  {error}
                </Text>

                <Input
                  type="submit"
                  value={t("loginPageButtonLogin")}
                  bg="green.400"
                  color="white"
                  marginTop={3}
                />
                <Text fontSize="sm">
                  <Trans i18nKey="loginPageLinkToSignupPage">
                    <Link
                      color="green.600"
                      onClick={() => navigate("/signup")}
                    ></Link>
                  </Trans>
                </Text>
              </VStack>
            </form>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default PageLogin;
