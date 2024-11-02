import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import ProfilePage from "../pages/profile";
import Membership from "../pages/membership";
import MyPage from "../pages/mypage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={""} element={<Home />}>
          <Route path={"/profile"} element={<ProfilePage />} />
        </Route>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/membership"} element={<Membership />} />
        <Route path={"/mypage"} element={<MyPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
