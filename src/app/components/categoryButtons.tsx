"use client"
import {useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";
import { catIListatom, listSelector } from "../serverUtils/state";

// fetches data from server about category name and it's id.


export const CategoryButtons = () => {

  const [catIdList, setCatIdList] = useRecoilStateLoadable(catIListatom);
  const list = useRecoilValueLoadable(listSelector)

  const handleChange = (id: number) => {
    if (catIdList.state === "hasValue") {
        setCatIdList(id); 
    }
  };
  if (list.state ==="hasValue"){

    return (
      <>
        {list.contents.map((item) => (
          <button key={item.id} className=" bg-black p-5 text-white" onClick={()=>handleChange(item.id)}>{item.name}</button>

        ))}
      </>
    );
  }

  if (list.state === "loading") {
    return <div className=" bg-slate-600 text-white">Loading...</div>;
    
  }

  if (list.state === "hasError") {
    return <div>Error loading categories</div>;
  }
  
  
  };


