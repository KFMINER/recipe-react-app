import NavBar from "./components/NavBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLogin from "./components/pages/PageLogin";
import PageSignup from "./components/pages/PageSignup";
import PageRecipeForm from "./components/pages/PageRecipeForm";
import PageRecipes from "./components/pages/PageRecipes";
import PageRecipe from "./components/pages/PageRecipe";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/recipes" />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/signup" element={<PageSignup />} />
        <Route path="/recipeform" element={<PageRecipeForm />} />
        <Route path="/recipes" element={<PageRecipes />} />
        <Route path="/recipes">
          <Route path=":recipeId" element={<PageRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
