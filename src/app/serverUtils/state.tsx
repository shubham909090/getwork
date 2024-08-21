import { atom , selector} from "recoil";
import { getAllCategories } from "./cat";
import { Category } from "@prisma/client";
import { getJobWithCategory } from "./User";

export const catIListatom = atom<number>({
    key: "catIListatom",
    default: undefined,
  });


 export const listSelector = selector<Category[]>({
    key: "listSelector",
    get: async () => {
      const res = await getAllCategories(); 
      return res
    },
  });

export const cardsSelector = selector<{
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