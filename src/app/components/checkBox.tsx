"use client"
import { atom, useRecoilStateLoadable, useRecoilState, selector, useRecoilValueLoadable } from "recoil";
import { Category } from "@prisma/client";
import { useEffect } from "react";
import { getAllCategories } from "../serverUtils/cat";

export const catIListatom = atom<number>({
  key: "catIListatom",
  default: undefined,
});

// const listatom = atom<Category[]>({
//   key: "listatom",
//   default: undefined,
// });

const listSelector = selector<Category[]>({
  key: "listSelector",
  get: async () => {
    const res = await getAllCategories(); // Fetch data from server
    return res // Ensure it's always an array
  },
});

export const Checkbox = () => {
  const [catIdList, setCatIdList] = useRecoilStateLoadable(catIListatom);
  // const [list, setList] = useRecoilStateLoadable(listatom);
  const list = useRecoilValueLoadable(listSelector)

  // useEffect(() => {
  //   async function loadeCatIds() {
  //     const res = await getAllCategories();
  //     setList(res);
  //   }
  //   loadeCatIds();
  // }, []);

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
