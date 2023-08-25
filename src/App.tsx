import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHome from "./components/PageHome";
import PageLogin from "./components/PageLogin";
import PageSignup from "./components/PageSignup";
import PageNewRecipe from "./components/PageNewRecipe";
import PageMyRecipes from "./components/PageMyRecipes";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/signup" element={<PageSignup />} />
        <Route path="/newRecipe" element={<PageNewRecipe />} />
        <Route path="/recipes" element={<PageMyRecipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
