import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHome from "./components/PageHome";
import PageLogin from "./components/PageLogin";
import PageSignup from "./components/PageSignup";
import PageRecipeForm from "./components/PageRecipeForm";
import PageRecipes from "./components/PageRecipes";
import PageRecipe from "./components/PageRecipe";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/signup" element={<PageSignup />} />
        <Route path="/recipeform" element={<PageRecipeForm />} />
        <Route path="/recipes" element={<PageRecipes />} />
        <Route path="/recipe">
          <Route path=":recipeId" element={<PageRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
