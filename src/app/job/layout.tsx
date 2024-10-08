import React, { Children } from "react";
import Navigation from "../utils -components/header-footer/NavigationWraper";
import Footer from "../utils -components/header-footer/Footer";



export default function layout({ children }:{ children: React.ReactNode}) {
  return (
    <>

      <Navigation />
      {children}
      <Footer />
    
    </>
  );
}
