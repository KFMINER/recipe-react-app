import { useParams } from "react-router-dom";

const PageRecipe = () => {
  const { recipeId } = useParams();

  return <div>PageRecipe - {recipeId}</div>;
};

export default PageRecipe;
