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

const UserInfo = () => {
  const signOut = useSignOut();

  return (
    <Menu>
      <MenuButton>
        <HStack>
          <Box width="30px">
            <FaUserCircle color="white" fontSize="30px" />
          </Box>
          <Text color="white" marginTop={-1}>
            KFMINER
          </Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserInfo;
