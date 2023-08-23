import { Grid, GridItem } from "@chakra-ui/react";
import SideNav from "./sideNav";

const PageHome = () => {
  return (
    <Grid templateAreas={`"aside main"`} gridTemplateColumns={"250px 1fr"}>
      <GridItem area="aside">
        <SideNav />
      </GridItem>
      <GridItem area="main">main</GridItem>
    </Grid>
  );
};

export default PageHome;
