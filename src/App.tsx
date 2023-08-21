import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHome from "./components/PageHome";
import PageLogin from "./components/PageLogin";

function App() {
  return (
    <BrowserRouter>
      <NavBar isLoggedIn={false} />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
