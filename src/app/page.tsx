
import { validateHeaderValue } from "http";
import { Suspense, useEffect } from "react";

async function delay() {
  await new Promise(r=>setTimeout(r,3000))
    return "hi"
}
export default function Home() {
 const value= delay()

return<>
    <Suspense fallback ={<div className="flex justify-center h-screen items-center text-black">loding...</div>}>
     <div className=" flex justify-center h-screen items-center text-black">{value}</div>
     </Suspense>

</>
}
