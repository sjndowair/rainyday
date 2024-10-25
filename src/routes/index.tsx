import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import ProfilePage from "../pages/profile";
import Membership from "../pages/membership";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={""} element={<Home />}>
          <Route path={"/profile"} element={<ProfilePage />} />
        </Route>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/membership"} element={<Membership />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
