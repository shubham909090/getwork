"use client"


import {getJobWithCategory} from "../serverUtils/User"
import { atom, selector, useRecoilStateLoadable, useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { catIListatom } from "../serverUtils/state";

// fetches data deom server about available jobs in database (all rn no pagination) with all the categories it belongs to.
const cardsSelector = selector<{
    id: number;
    title: string;
    description: string;
    categories: {
        category: {
            id: number;
            name: string;
        };
    }[];}[]>({
    key: "cardsSelector",
    get: async ({get}) => {
        const value = get(catIListatom)
      const res = await getJobWithCategory(value); 
      return res;
    },});

export default function JobCards() {

const cards = useRecoilValueLoadable(cardsSelector)


    if (cards.state === "loading") {
        return <div className=" bg-black text-white">Loading...</div>;
      }
    
      if (cards.state === "hasError") {
        return <div>Error loading categories</div>;
      }
    


  return <>
        {cards.contents.map(item=>{
            return <div className=" flex flex-col justify-center border-2 rounded-xl m-10">
                <div className=" m-5 flex justify-start">{item.title}</div>
                <div className=" m-5 flex justify-start">{item.description}</div>
                <button className=" bg-black text-white p-5 rounded-xl m-5" onClick={()=>console.log(item.id)}>click me</button>
                <div className=" flex flex-row justify-start m-5">{item.categories.map(item=>{
                    return<>
                    <div className=" text-fuchsia-700 bg-fuchsia-400 p-5 rounded-xl m-5">{item.category.name}</div>
                    </>
                })}</div>
            </div>
        })}
  
  </>
}

