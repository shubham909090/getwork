"use client"
import { atom, useRecoilStateLoadable, useRecoilState } from "recoil";
import { Category } from "@prisma/client";
import { useEffect } from "react";
import { getAllCategories } from "../serverUtils/cat";

export const catIListatom = atom<number>({
  key: "catIListatom",
  default: undefined,
});

const listatom = atom<Category[]>({
  key: "listatom",
  default: [],
});

export const Checkbox = () => {
  const [catIdList, setCatIdList] = useRecoilStateLoadable(catIListatom);
  const [list, setList] = useRecoilStateLoadable(listatom);

  useEffect(() => {
    async function loadeCatIds() {
      const res = await getAllCategories();
      setList(res);
    }
    loadeCatIds();
  }, []);

  const handleChange = (id: number) => {
    if (catIdList.state === "hasValue") {
        setCatIdList(id);  
    }
  };
  

  if (list.state === "loading") {
    return <div className=" bg-black">Loading...</div>;
  }

  if (list.state === "hasError") {
    return <div>Error loading categories</div>;
  }

  return (
    <>
      {list.contents.map((item) => (
        <button className=" bg-black p-5 text-white" onClick={()=>handleChange(item.id)}>{item.name}</button>
      ))}
    </>
  );
};
