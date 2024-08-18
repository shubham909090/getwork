"use client" 
import { RecoilRoot } from "recoil";
import { Checkbox } from "../components/checkBox";
import JobCards from "../components/jobCards"


export default function UserDash() {
  
  return (
    <><RecoilRoot>
        <Checkbox />
        <JobCards />
      </RecoilRoot>
    </>
  )
}

