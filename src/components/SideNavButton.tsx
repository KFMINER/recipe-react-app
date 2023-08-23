import { HStack, Text, background } from "@chakra-ui/react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

const SideNavButton = () => {
  const [isHovered, setHovered] = useState(false);

  return (
    <HStack
      justifyContent="flex-start"
      width="90%"
      marginTop={5}
      padding={3}
      bg={isHovered ? "green.500" : "transparent"}
      cursor={isHovered ? "pointer" : "default"}
      borderRadius={7}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MdAdd size="30px" />
      <Text marginLeft={3}>Neues Rezept...</Text>
    </HStack>
  );
};

export default SideNavButton;
