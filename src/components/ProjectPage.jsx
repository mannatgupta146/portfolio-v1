"use client"

import gsap, { ScrollTrigger, useGSAP } from "@/libs/gsap"
import TextReveal from "./TextReveal"
import { useRef } from "react"
import useViewTransition from "@/hooks/useViewTransition"

const ProjectPage = ({ project, nextProject, prevProject }) => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const navRef = useRef(null)

  useGSAP(
    () => {
      const isMobile = window.matchMedia("(max-width: 639px)").matches

      // HERO IMAGE ANIMATION

      gsap.fromTo(
        imageRef.current,
        isMobile
          ? {
              opacity: 0,
              y: 24,
              scale: 1.06,
            }
          : {
              clipPath: "inset(0% 50% 0% 50%)",
              scale: 1.25,
              filter: "blur(8px)",
            },
        isMobile
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              delay: 0.5,
              ease: "power3.out",
            }
          : {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              filter: "blur(0px)",
              duration: 1.8,
              delay: 1.2,
              ease: "expo.inOut",
            },
      )

      // GALLERY ANIMATIONS

      const sections = gsap.utils.toArray(".gallery-section")

      sections.forEach((section, index) => {
        const imageContainer = section.querySelector(".gallery-image")

        if (isMobile) {
          gsap.fromTo(
            imageContainer,
            {
              opacity: 0,
              y: 28,
              scale: 0.98,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "top 55%",
                scrub: false,
              },
            },
          )
          return
        }

        gsap.to(imageContainer, {
          rotate: 0,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
            ease: "none",
          },
        })

        if (index === sections.length - 1) return

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        })
      })

      if (navRef.current) {
        const navItems = navRef.current.querySelectorAll("button")

        gsap.fromTo(
          navRef.current,
          isMobile ? { opacity: 0, y: 16 } : { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.7 : 0.9,
            delay: isMobile ? 1.1 : 2,
            ease: "power3.out",
          },
        )

        gsap.fromTo(
          navItems,
          isMobile ? { opacity: 0, y: 10 } : { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.6 : 0.8,
            delay: isMobile ? 1.2 : 2.1,
            ease: "power3.out",
            stagger: isMobile ? 0.06 : 0.12,
          },
        )
      }
    },
    {
      scope: containerRef,
    },
  )

  const { navigateTo } = useViewTransition()

  const handleNextProject = () => {
    navigateTo(`/project/${nextProject.slug}`)
  }

  const handlePrevProject = () => {
    navigateTo(`/project/${prevProject.slug}`)
  }

  return (
    <main ref={containerRef}>
      <section className="min-h-screen w-full lg:h-screen">
        <div className="flex h-full w-full flex-col gap-8 px-4 pb-8 pt-10 sm:px-6 lg:flex-row lg:gap-0 lg:px-8 lg:pb-3 lg:pt-16">
          <div className="firstSegment h-auto w-full lg:h-full lg:w-[5%]">
            <TextReveal delay={1.3} splitBy="chars" stagger={0.05}>
              <h3 className="text-2xl">{project.number}</h3>
            </TextReveal>
          </div>

          <div className="secondSegment h-[38vh] w-full sm:h-[45vh] lg:h-[85%] lg:w-[40%]">
            <div className="imageDiv overflow-hidden h-full w-full">
              <img
                ref={imageRef}
                className="h-full w-full object-cover"
                src={project.coverImage}
                alt={project.title}
              />
            </div>
          </div>

          <div className="thirdSegment flex h-auto w-full flex-col lg:h-[85%] lg:w-[55%] lg:pl-12">
            {/* Top Content */}
            <div className="mt-0 lg:mt-auto">
              <div className="heading">
                <TextReveal delay={1.3} splitBy="chars" stagger={0.05}>
                  <h1 className="text-[1.65rem] leading-[1.08] sm:text-[1.9rem]">
                    {project.title}
                  </h1>
                </TextReveal>
              </div>

              <div className="subHeading mt-2 flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                <TextReveal delay={1.5} splitBy="words" stagger={0.05}>
                  <h2 className="text-[1.15rem] tracking-[-1px] text-gray-700 sm:text-[1.55rem] sm:tracking-[-2px]">
                    {project.subtitle}
                  </h2>
                </TextReveal>

                <TextReveal delay={1.6} splitBy="chars" stagger={0.05}>
                  <span className="text-[0.95rem] tracking-[-0.5px] sm:text-[1.15rem] sm:tracking-[-1px]">
                    {project.year}
                  </span>
                </TextReveal>
              </div>

              <div className="mt-5 max-w-none sm:mt-6 sm:max-w-[85%]">
                <TextReveal delay={1.8} splitBy="lines">
                  <p className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-[1.08rem] sm:leading-tight">
                    {project.description}
                  </p>
                </TextReveal>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div
              ref={navRef}
              className="mt-12 flex flex-row items-end justify-between gap-4 border-t border-zinc-300 pt-7 sm:mt-16 sm:gap-8 sm:pt-8"
            >
              {/* Previous */}
              <button
                onClick={handlePrevProject}
                className="group flex min-w-0 flex-1 items-end gap-3 text-left"
              >
                <span className="text-2xl transition-transform duration-300 group-hover:-translate-x-2 sm:text-3xl">
                  &lt;
                </span>

                <div className="min-w-0 text-left">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-500 sm:text-[10px] sm:tracking-[0.45em]">
                    Previous Project
                  </p>

                  <h3 className="mt-1 truncate text-[0.95rem] transition-colors duration-300 group-hover:text-zinc-500 sm:text-[1.35rem]">
                    {prevProject.title}
                  </h3>
                </div>
              </button>

              {/* Next */}
              <button
                onClick={handleNextProject}
                className="group flex min-w-0 flex-1 items-end justify-end gap-3 text-right"
              >
                <div className="min-w-0 text-right">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-500 sm:text-[10px] sm:tracking-[0.45em]">
                    Next Project
                  </p>

                  <h3 className="mt-1 truncate text-[0.95rem] transition-colors duration-300 group-hover:text-zinc-500 sm:text-[1.35rem]">
                    {nextProject.title}
                  </h3>
                </div>

                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                  &gt;
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {project.gallery.map((image, index) => (
        <section
          key={index}
          className="gallery-section h-[80vh] w-full overflow-hidden sm:h-screen"
        >
          <div
            style={{
              transformOrigin: "bottom left",
            }}
            className="gallery-image h-full w-full sm:rotate-45"
          >
            <img className="h-full w-full object-cover" src={image} alt="" />
          </div>
        </section>
      ))}

      <footer className="min-h-screen w-full border-t border-zinc-300 px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:min-h-screen">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between gap-10 sm:gap-0">
          {/* Heading */}
          <div>
            <TextReveal trigger="scroll" splitBy="lines">
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-zinc-500 sm:mb-4 sm:text-sm sm:tracking-[0.45em]">
                Let's Connect
              </p>
            </TextReveal>

            <TextReveal trigger="scroll" splitBy="chars" stagger={0.02}>
              <h1 className="max-w-[12ch] text-[clamp(1.45rem,7.6vw,4.25rem)] leading-[0.92] tracking-tighter sm:max-w-5xl sm:text-[clamp(4rem,9vw,9rem)] sm:leading-[0.95] sm:tracking-[-0.06em]">
                <span className="block whitespace-nowrap">Let's Build</span>
                <span className="block whitespace-nowrap">Something</span>
                <span className="block whitespace-nowrap">Exceptional.</span>
              </h1>
            </TextReveal>
          </div>

          {/* Contact Links */}
          <div className="mt-20 overflow-hidden rounded-4xl border border-zinc-200 bg-white/70 backdrop-blur-sm sm:mt-28">
            <div className="border-b border-zinc-200 px-5 py-4 sm:px-8 sm:py-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-xs sm:tracking-[0.35em]">
                Contact Links
              </p>
            </div>

            <a
              href="mailto:mannatgupta146@gmail.com"
              className="group flex items-center justify-between gap-4 border-b border-zinc-200 px-5 py-5 transition-colors duration-300 hover:bg-zinc-50 sm:gap-6 sm:px-8 sm:py-7"
            >
              <div className="min-w-0">
                <p className="mb-1.5 text-[9px] uppercase tracking-[0.3em] text-zinc-500 sm:mb-2 sm:text-[10px] sm:tracking-[0.35em]">
                  Email
                </p>

                <h2 className="truncate text-[1.15rem] tracking-tight text-zinc-900 transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                  mannatgupta146@gmail.com
                </h2>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-xl text-zinc-900 transition-all duration-300 group-hover:border-zinc-900 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-12 sm:w-12 sm:text-2xl">
                ↗
              </span>
            </a>

            <a
              href="https://github.com/mannatgupta146"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border-b border-zinc-200 px-5 py-5 transition-colors duration-300 hover:bg-zinc-50 sm:gap-6 sm:px-8 sm:py-7"
            >
              <div className="min-w-0">
                <p className="mb-1.5 text-[9px] uppercase tracking-[0.3em] text-zinc-500 sm:mb-2 sm:text-[10px] sm:tracking-[0.35em]">
                  GitHub
                </p>

                <h2 className="truncate text-[1.15rem] tracking-tight text-zinc-900 transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                  github.com/mannatgupta146
                </h2>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-xl text-zinc-900 transition-all duration-300 group-hover:border-zinc-900 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-12 sm:w-12 sm:text-2xl">
                ↗
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/mannatgupta146/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 px-5 py-5 transition-colors duration-300 hover:bg-zinc-50 sm:gap-6 sm:px-8 sm:py-7"
            >
              <div className="min-w-0">
                <p className="mb-1.5 text-[9px] uppercase tracking-[0.3em] text-zinc-500 sm:mb-2 sm:text-[10px] sm:tracking-[0.35em]">
                  LinkedIn
                </p>

                <h2 className="truncate text-[1.15rem] tracking-tight text-zinc-900 transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                  linkedin.com/in/mannatgupta146
                </h2>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-xl text-zinc-900 transition-all duration-300 group-hover:border-zinc-900 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-12 sm:w-12 sm:text-2xl">
                ↗
              </span>
            </a>
          </div>

          {/* Bottom */}
          <div className="mt-12 flex flex-col gap-3 border-t border-zinc-300 pt-6 sm:mt-16 sm:flex-row sm:items-end sm:justify-between sm:gap-0 sm:pt-8">
            <h2 className="text-xl font-medium tracking-[-0.04em] text-zinc-900 sm:text-2xl">
              Mannat Gupta
            </h2>

            <p className="max-w-sm text-sm leading-6 text-zinc-500 sm:text-right sm:text-base">
              MERN Stack Developer
              <br />
              Available for internships & full-time opportunities.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default ProjectPage
