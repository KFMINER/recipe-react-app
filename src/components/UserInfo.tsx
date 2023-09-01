import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import useSignOut from "react-auth-kit/dist/hooks/useSignOut";
import { useAuthUser } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const signOut = useSignOut();
  const auth = useAuthUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton>
        <HStack>
          <Box width="30px">
            <FaUserCircle color="white" fontSize="30px" />
          </Box>
          <Text color="white" marginTop={-1}>
            {auth()?.username}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            signOut();
            navigate("/");
          }}
        >
          {t("userInfoMenuItemSignOut")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserInfo;
