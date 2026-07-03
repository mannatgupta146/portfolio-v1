"use client"

import TextReveal from "@/components/TextReveal";
import { useRef } from "react";

export default function Page() {

  const triggerRef = useRef(null);

  const handleHoverEnter = () => {
    triggerRef.current?.play()
  }

  const handleHoverLeave = () => {
    triggerRef.current?.reverse()
  }

  return (
    <main className='h-[200vh] w-full '>
      <div onPointerEnter={handleHoverEnter} onPointerLeave={handleHoverLeave} className="h-50 w-50 bg-amber-400"></div>

      <TextReveal ref={triggerRef} splitBy="words" trigger= "manual">
        <h1 className='text-4xl'>Welcome to the Page</h1>
      </TextReveal>
    </main>
  );
}