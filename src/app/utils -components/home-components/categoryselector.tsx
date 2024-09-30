"use client";

import { Button } from '@/components/ui/button';
import React from 'react';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/app/serverUtils/cat';
import { pageatom } from './jobcards';
import { Skeleton } from '@/components/ui/skeleton';



// Atom for selected categories
export const selectedCategories = atom<number[]>({
  key: 'selectedCategories',
  default: [],
});

export function Categoryselector() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchcategories'],
    queryFn: () => getAllCategories(),
  });


  const [selectedcat, setselectedcat] = useRecoilState(selectedCategories); // Store selected category IDs

  const setpage = useSetRecoilState(pageatom)
  // Handle the click event for toggling button state
  function handleClick(id: number) {
    if (selectedcat.includes(id)) {
      // Remove the ID if it's already in the state
      setselectedcat((oldArray) => oldArray.filter((oldId) => oldId !== id));
    } else {
      // Add the ID if it's not already in the state
      setselectedcat((prev) => [...prev, id]);
    }
    setpage(1)
  }


  if (isLoading) {
    return <div className="flex flex-row justify-center gap-2">
    <Skeleton className="h-4 w-10" />
    <Skeleton className="h-4 w-10" />
    <Skeleton className="h-4 w-10" />
    <Skeleton className="h-4 w-10" />
    <Skeleton className="h-4 w-10" />
    <Skeleton className="h-4 w-10" />
  </div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {data?.map((category) => (
        <Button
          onClick={() => handleClick(category.id)}
          key={category.id}
          variant="secondary"
          className={`${
            selectedcat.includes(category.id) ? 'bg-black text-white' : 'bg-white text-primary'
          } hover:bg-black hover:text-white`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

export default Categoryselector;
