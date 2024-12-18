import { ReactNode, useState, useEffect,  JSX } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./style.css";
import Noti from "../components/noti";
import {useStore, useThemeStore} from "../store";
import Member from "../member";
import Theme from "../components/theme";



interface ILayout {
  children?: JSX.Element | string | number | ReactNode;
}

const Layout = ({ children }: ILayout) => {

  const isModalState = useStore(state => state.modalState);
  const isCloseModal = useStore(state => state.isCloseModal);

  const {toggleTheme,isDarkMode} = useThemeStore();

  //
  // useEffect(() => {
  //   const isCreateRainDropEffect = () => {
  //     const isRainDrop = document.createElement("div");
  //     isRainDrop.classList.add("rainDrop");
  //     isRainDrop.style.left = `${Math.random() * 100}%`;
  //     isRainDrop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
  //     document.getElementById("rain-container")?.appendChild(isRainDrop);
  //     setTimeout(() => isRainDrop.remove(), 2000);
  //   };
  //   const isRemoveRainDropEffect = setInterval(isCreateRainDropEffect, 100);
  //   return () => clearInterval(isRemoveRainDropEffect);
  // }, []);
  return (
           // <Member>
      <>
          <Header />
          <Theme >
            {isModalState && <Noti />}
            <div
                id="rain-container"
                className="fixed inset-0 pointer-events-none "
            />
            <main onClick={isCloseModal}>{children}</main>
          </Theme>
          <Footer />
      </>
        // </Member>

  );
};

export default Layout;
