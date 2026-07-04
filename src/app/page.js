"use client"

import InfiniteCarousel from "@/components/InfiniteCarousel";
import { projects } from "@/data/projects";

export default function Page() {

  return (
    <main className='h-screen w-full flex items-center justify-center'>
      <InfiniteCarousel projects={projects}/>
    </main>
  );
}