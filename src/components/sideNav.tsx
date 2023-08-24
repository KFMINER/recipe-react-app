import { VStack, Text, Divider } from "@chakra-ui/react";
import SideNavButton from "./SideNavButton";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const sideNav = () => {
  const navigate = useNavigate();

  return (
    <VStack minHeight="calc(100vh - 60px)" bg="green.600" color="white">
      <SideNavButton
        label="New Recipe..."
        icon={<MdAdd />}
        onClick={() => navigate("/newRecipe")}
      />
      <Divider marginY={3} />
      <Text>Suppen</Text>
    </VStack>
  );
};

export default sideNav;
