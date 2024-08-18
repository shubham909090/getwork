"use client"
import { atom, useRecoilStateLoadable, useRecoilState, selector, useRecoilValueLoadable } from "recoil";
import { Category } from "@prisma/client";
import { getAllCategories } from "../serverUtils/cat";
import { catIListatom } from "../serverUtils/state";

// fetches data from server about category name and it's id.
const listSelector = selector<Category[]>({
  key: "listSelector",
  get: async () => {
    const res = await getAllCategories(); 
    return res
  },
});

export const Checkbox = () => {

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
          <button className=" bg-black p-5 text-white" onClick={()=>handleChange(item.id)}>{item.name}</button>
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


