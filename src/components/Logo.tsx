import { Box, HStack, Text } from "@chakra-ui/react";
import { BsFillBoxFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <HStack onClick={() => navigate("/")} flexBasis="auto" cursor="pointer">
      <Box width="30px">
        <BsFillBoxFill color="white" fontSize="30px" />
      </Box>

      <Text
        fontSize="2xl"
        color="white"
        marginTop={-1}
        className="prevent-select"
      >
        Recipe<Text as="b">Box</Text>
      </Text>
    </HStack>
  );
};

export default Logo;
