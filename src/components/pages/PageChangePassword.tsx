import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService, { User } from "../../services/user-service";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PageChangePassword = () => {
  const { t } = useTranslation();

  const schema = z
    .object({
      password: z
        .string()
        .min(1, { message: t("changePasswordPageErrorPasswordRequired") }),
      newPassword: z
        .string()
        .min(1, { message: t("changePasswordPageErrorNewPasswordRequired") })
        .min(8, { message: t("changePasswordPageErrorNewPasswordLengthMin") })
        .max(255, { message: t("changePasswordPageErrorNewPasswordLengthMax") })
        .regex(new RegExp("(?=.*[A-Z])"), {
          message: t("changePasswordPageErrorNewPasswordNoUpperCase"),
        })
        .regex(new RegExp("(?=.*[a-z])"), {
          message: t("changePasswordPageErrorNewPasswordNoLowerCase"),
        }),
      newPasswordConfirm: z.string().min(1, {
        message: t("changePasswordPageErrorConfirmPasswordRequired"),
      }),
    })
    .superRefine(({ newPasswordConfirm, newPassword }, ctx) => {
      if (newPasswordConfirm !== newPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["newPasswordConfirm"],
          message: t("changePasswordPageErrorConfirmPasswordNotMatching"),
        });
      }
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const auth = useAuthUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = (data: FieldValues) => {
    const { request } = userService.get<User>(auth()?.username, data.password);
    request
      .then((res) => {
        const { request } = userService.update(res.data.id, {
          password: data.newPassword,
        });
        request
          .then(() => {
            navigate("/");
          })
          .catch(() => {
            setError(t("changePasswordPageErrorChangingPassword"));
          });
      })
      .catch((err) => {
        setError(t("changePasswordPageError-" + err.response.status));
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
            <VStack gap={10}>
              <Heading size="lg" fontWeight="semibold">
                Passwort ändern
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={2} alignItems="start">
                  <FormControl isInvalid={errors.password ? true : false}>
                    <InputGroup>
                      <Input
                        type="password"
                        placeholder={t(
                          "changePasswordPageInputPlaceholderPassword"
                        )}
                        {...register("password")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.newPassword ? true : false}>
                    <InputGroup>
                      <Input
                        type="password"
                        placeholder={t(
                          "changePasswordPageInputPlaceholderNewPassword"
                        )}
                        {...register("newPassword")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.newPassword && errors.newPassword.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={errors.newPasswordConfirm ? true : false}
                  >
                    <InputGroup>
                      <Input
                        type="password"
                        placeholder={t(
                          "changePasswordPageInputPlaceholderNewPasswordConfirm"
                        )}
                        {...register("newPasswordConfirm")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.newPasswordConfirm &&
                        errors.newPasswordConfirm.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Text fontSize={"sm"} color="red.500">
                    {error}
                  </Text>

                  <Input
                    type="submit"
                    value={t("changePasswordPageButtonSubmit")}
                    bg="green.400"
                    color="white"
                    marginTop={3}
                    cursor="pointer"
                  />
                </VStack>
              </form>
            </VStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default PageChangePassword;
