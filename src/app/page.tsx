
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { Suspense, useEffect } from "react";


export default function Home() {
  redirect('/main')


return<>
    <Suspense fallback ={<div className="flex justify-center h-screen items-center text-black">loding...</div>}>
     <div className=" flex justify-center h-screen items-center text-black">Hi</div>
     </Suspense>

</>
}
