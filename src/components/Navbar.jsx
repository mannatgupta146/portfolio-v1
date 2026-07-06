"use client"

import TextReveal from "./TextReveal"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-30 w-full border-b border-black/5 bg-white/80 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo / Name */}
        <TextReveal splitBy="words" duration={1} ease="power4.out">
          <h1 className="text-[1.1rem] font-medium tracking-tight sm:text-[1.35rem] lg:text-[1.5rem]">
            Mannat Gupta
          </h1>
        </TextReveal>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <TextReveal
            delay={0.2}
            splitBy="chars"
            stagger={0.015}
            duration={0.7}
          >
            <button className="cursor-pointer whitespace-nowrap text-[0.95rem] sm:text-[1rem] lg:text-[1.1rem]">
              Home
            </button>
          </TextReveal>

          <TextReveal
            delay={0.3}
            splitBy="chars"
            stagger={0.015}
            duration={0.7}
          >
            <button className="cursor-pointer whitespace-nowrap text-[0.95rem] sm:text-[1rem] lg:text-[1.1rem]">
              About
            </button>
          </TextReveal>

          <TextReveal
            delay={0.4}
            splitBy="chars"
            stagger={0.015}
            duration={0.7}
          >
            <button className="cursor-pointer whitespace-nowrap text-[0.95rem] sm:text-[1rem] lg:text-[1.1rem]">
              Contact
            </button>
          </TextReveal>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
