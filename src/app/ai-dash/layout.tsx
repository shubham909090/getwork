import React, { Children } from "react";
import Footer from "../utils -components/header-footer/Footer";
import NavigationWraper from "../utils -components/header-footer/NavigationWraper";



export default function layout({ children }:{ children: React.ReactNode}) {
  return (
    <>

      <NavigationWraper />
      {children}
      <Footer />
    
    </>
  );
}
