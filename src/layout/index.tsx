import { ReactNode } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

interface ILayout {
  chirdren?: JSX.Element | string | number | ReactNode;
}

export const Layout = ({ chirdren }: ILayout) => {
  return (
    <>
      <Header />
      <main>{chirdren}</main>
      <Footer />
    </>
  );
};
