import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import ProfilePage from "../pages/profile/inex";
import CreatePage from "../pages/create";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={""} element={<Home />}>
          <Route path={"/profile"} element={<ProfilePage />} />
        </Route>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/create"} element={<CreatePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
