import React, { Children } from "react";
import Navigation from "../utils -components/Navigation";
import Footer from "../utils -components/Footer";



export default function layout({ children }:{ children: React.ReactNode}) {
  return (
    <>

      <Navigation />
      {children}
      <Footer />
    
    </>
  );
}
