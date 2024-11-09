import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import ProfilePage from "../pages/profile";
import Membership from "../pages/membership";
import MyPage from "../pages/mypage";
import MainPage from "../pages/chat";

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
        <Route path={"/chat"} element={<MainPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
