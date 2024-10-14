// /middleware.ts

// export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export default async function middleware(request: NextRequest) {
  // Fetch the role from your role endpoint
  const res = await fetch(`${request.nextUrl.origin}/api/role`, {
    headers: {
      Cookie: request.headers.get("cookie") || "",
    },
  });
  const data = await res.json();
  if(data==="NONE"){
    return NextResponse.redirect(new URL("/", request.url));
  }
  const userRole = data?.role;


  const urlPath = request.nextUrl.pathname;


  if (urlPath.startsWith("/sellerdash") && userRole !== "SELLER") {
    
    return NextResponse.redirect(new URL("/", request.url));
  } else if (urlPath.startsWith("/userdash") && userRole !== "USER") {


    return NextResponse.redirect(new URL("/", request.url));
  }
  

  // Allow access if the role matches the path
  return NextResponse.next();
}
export const config = {
  matcher: ['/sellerdash/:path*', '/userdash/:path*'],
};
