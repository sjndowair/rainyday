import { ReactNode, useState, useEffect, JSX } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./style.css";
import Noti from "../components/noti";
import { useStore } from "../store";
import Member from "../member";
import Theme from "../components/theme";

interface ILayout {
  children?: JSX.Element | string | number | ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const isModalState = useStore((state) => state.modalState);
  const isCloseModal = useStore((state) => state.isCloseModal);

  return (
    <Member>
      <>
        <Header />
        <Theme>
          {isModalState && <Noti />}
          <main className="md:pt-[3.5rem] pt-[7.25rem]" onClick={isCloseModal}>
            {children}
          </main>
        </Theme>
        <Footer />
      </>
    </Member>
  );
};

export default Layout;
