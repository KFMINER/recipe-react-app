import { Box, HStack, Text } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

const UserInfo = () => {
  return (
    <HStack>
      <Box width="30px" marginLeft={5}>
        <FaUserCircle color="white" fontSize="30px" />
      </Box>
      <Text color="white" marginTop={-1}>
        KFMINER
      </Text>
    </HStack>
  );
};

export default UserInfo;
