'use client'

import AuthProvider from "../authprovider";


export default function layout({ children }:{ children: React.ReactNode}) {
    return (
      <html lang="en">
      <AuthProvider>
        <body>{children}</body>
        </AuthProvider>
      </html>
    );
  }
  