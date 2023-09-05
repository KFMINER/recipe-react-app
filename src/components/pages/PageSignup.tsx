import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { BiSolidUser } from "react-icons/bi";
import { FaKey } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService from "../../services/user-service";
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  Link,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

/**
 * A page component, on which the user can create a new account.
 * @returns Signup-Page component
 * @author Kevin Friedrichs
 */
const PageSignup = () => {
  const { t } = useTranslation();

  const schema = z
    .object({
      username: z
        .string()
        .min(1, { message: t("signupPageErrorUsernameRequired") }),
      password: z
        .string()
        .min(1, { message: t("signupPageErrorPasswordRequired") })
        .min(8, { message: t("signupPageErrorPasswordLengthMin") })
        .max(255, { message: t("signupPageErrorPasswordLengthMax") })
        .regex(new RegExp("(?=.*[A-Z])"), {
          message: t("signupPageErrorPasswordNoUpperCase"),
        })
        .regex(new RegExp("(?=.*[a-z])"), {
          message: t("signupPageErrorPasswordNoLowerCase"),
        }),
      confirmPassword: z
        .string()
        .min(1, { message: t("signupPageErrorConfirmPasswordRequired") }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          path: ["confirmPassword"],
          message: t("signupPageErrorConfirmPasswordNotMatching"),
        });
      }
    });

  type FormData = z.infer<typeof schema>;

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  /**
   * Send formData to backend for account creation.
   * Redirects to loginPage on success, or displays error in failure.
   * @param data Input-Form data (username, password, confirmPassword)
   */
  const onSubmit = (data: FieldValues) => {
    const user = {
      username: data.username,
      password: data.password,
    };
    const { request } = userService.create(user);
    request
      .then((res) => navigate("/login"))
      .catch((err) => setError(t("signupPageError-" + err.response.status)));
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
                      placeholder={t("signupPageInputPlaceholderUsername")}
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
                      placeholder={t("signupPageInputPlaceholderPassword")}
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

                <FormControl isInvalid={errors.confirmPassword ? true : false}>
                  <InputGroup>
                    <Input
                      type="password"
                      placeholder={t(
                        "signupPageInputPlaceholderConfirmPassword"
                      )}
                      {...register("confirmPassword")}
                    />
                    <InputLeftElement>
                      <FaKey size={16} color="gray" />
                    </InputLeftElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </FormErrorMessage>
                </FormControl>

                <Text fontSize={"sm"} color="red.500">
                  {error}
                </Text>

                <Input
                  type="submit"
                  value={t("signupPageButtonSignup")}
                  bg="green.400"
                  color="white"
                  marginTop={3}
                />
                <Text fontSize="sm">
                  <Trans i18nKey="signupPageLinkToLoginPage">
                    <Link
                      color="green.600"
                      onClick={() => navigate("/login")}
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

export default PageSignup;
