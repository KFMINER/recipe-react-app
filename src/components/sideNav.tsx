import { VStack, Text, Divider } from "@chakra-ui/react";
import SideNavButton from "./SideNavButton";

const sideNav = () => {
  return (
    <VStack minHeight="calc(100vh - 60px)" bg="green.600" color="white">
      <SideNavButton />
      <Divider marginY={3} />
      <Text>Suppen</Text>
    </VStack>
  );
};

export default sideNav;
