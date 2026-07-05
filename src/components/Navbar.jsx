"use client"

import TextReveal from "./TextReveal"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-30 flex h-16 w-full items-center justify-between px-8">
      {/* Logo / Name */}
      <TextReveal
        splitBy="words"
        duration={1}
        ease="power4.out"
      >
        <h1 className="text-[1.5rem] font-medium tracking-tight">
          Mannat Gupta
        </h1>
      </TextReveal>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <TextReveal
          delay={0.2}
          splitBy="chars"
          stagger={0.015}
          duration={0.7}
        >
          <button className="cursor-pointer text-[1.1rem]">
            Home
          </button>
        </TextReveal>

        <TextReveal
          delay={0.3}
          splitBy="chars"
          stagger={0.015}
          duration={0.7}
        >
          <button className="cursor-pointer text-[1.1rem]">
            About
          </button>
        </TextReveal>

        <TextReveal
          delay={0.4}
          splitBy="chars"
          stagger={0.015}
          duration={0.7}
        >
          <button className="cursor-pointer text-[1.1rem]">
            Contact
          </button>
        </TextReveal>
      </div>
    </nav>
  )
}

export default Navbar