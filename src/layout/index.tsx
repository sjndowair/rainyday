import { ReactNode } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

interface ILayout {
  children?: JSX.Element | string | number | ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      <main className="bg-slate-900 text-neutral-50">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
