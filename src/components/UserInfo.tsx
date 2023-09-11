import { useAuthUser } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/dist/hooks/useSignOut";
import { FaUserCircle } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

interface Props {
  color?: string;
  iconColor?: string;
  marginLeft?: string;
}

/**
 * A component, on which the current user is displayed.
 * Also contains a button to logout the current user.
 * @returns UserInfo component
 * @author Kevin Friedrichs
 */
const UserInfo = ({ color, iconColor, marginLeft }: Props) => {
  const signOut = useSignOut();
  const auth = useAuthUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton>
        <HStack marginLeft={marginLeft}>
          <Box width="30px" color={iconColor}>
            <FaUserCircle fontSize="30px" />
          </Box>
          <Text color={color} marginTop={-1}>
            {auth()?.username}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<PiSignOut />}
          onClick={() => {
            signOut();
            navigate("/");
          }}
        >
          {t("userInfoMenuItemSignOut")}
        </MenuItem>
        <MenuItem
          icon={<RiLockPasswordLine />}
          onClick={() => {
            navigate("/changepassword");
          }}
        >
          {t("userInfoMenuItemChangePassword")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserInfo;
