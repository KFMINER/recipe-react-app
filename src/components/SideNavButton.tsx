import { Box, HStack, Text, background } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { MdAdd } from "react-icons/md";

interface Props {
  onClick: () => void;
  label: string;
  icon: ReactNode;
}

const SideNavButton = ({ onClick, label, icon }: Props) => {
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
      onClick={onClick}
    >
      <Box fontSize="30px">{icon}</Box>

      <Text marginLeft={3}>{label}</Text>
    </HStack>
  );
};

export default SideNavButton;
