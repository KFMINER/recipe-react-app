import { VStack, Text, Divider } from "@chakra-ui/react";
import SideNavButton from "./SideNavButton";
import { MdAdd } from "react-icons/md";

const sideNav = () => {
  return (
    <VStack minHeight="calc(100vh - 60px)" bg="green.600" color="white">
      <SideNavButton
        label="New Recipe..."
        icon={<MdAdd />}
        onClick={() => console.log("test")}
      />
      <Divider marginY={3} />
      <Text>Suppen</Text>
    </VStack>
  );
};

export default sideNav;
