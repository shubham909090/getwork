import { SessionProvider } from "next-auth/react";
import "./globals.css";




export default function layout({ children }:{ children: React.ReactNode}) {
  return (
    <html lang="en">

      <SessionProvider>
      <body>{children}</body>
      </SessionProvider>
    </html>
  );
}
