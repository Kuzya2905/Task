import React from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import { LayoutTypes } from "./Layout.types";

// Макет обертка для компонентов
const Layout: React.FC<LayoutTypes> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
