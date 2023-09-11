import { Box, HStack, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const SideNavButton = ({ icon, label, onClick }: Props) => {
  return (
    <HStack
      onClick={onClick}
      cursor="pointer"
      padding={4}
      borderRadius={10}
      color="gray.700"
      w="100%"
      _hover={{ background: "green.100" }}
    >
      <Box width="20px" fontSize="20px" color="green.500">
        {icon}
      </Box>
      <Text
        fontSize="md"
        whiteSpace="nowrap"
        className="prevent-select"
        marginLeft={2}
      >
        {label}
      </Text>
    </HStack>
  );
};

export default SideNavButton;
