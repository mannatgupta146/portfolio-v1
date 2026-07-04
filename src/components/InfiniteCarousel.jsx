"use client"

import { useEffect, useRef } from "react"
import CarouselCard from "./CarouselCard"
import gsap from "@/libs/gsap"

const CARD_W = 300
const CARD_H = 300
const HOVER_SCALE = 1.25
const CARD_GAP = 30

const DURATION = 25

const TRACK_H = CARD_H * HOVER_SCALE

const InfiniteCarousel = ({ projects }) => {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    if (!trackRef.current || !projects.length) return

    const singleWidth = projects.length * (CARD_W + CARD_GAP)

    tweenRef.current?.kill()

    tweenRef.current = gsap.to(trackRef.current, {
      x: -singleWidth,
      duration: DURATION,
      ease: "none",
      repeat: -1,
    })

    return () => {
      tweenRef.current?.kill()
      tweenRef.current = null
    }
  }, [projects])

  const doubledProjects = [...projects, ...projects]

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        paddingTop: `${(CARD_H) / 2}px`,
        paddingBottom: `${(CARD_H - TRACK_H) / 2}px`,
      }}
    >
      <div
        ref={trackRef}
        className="flex items-center"
        style={{
          gap: `${CARD_GAP}px`,
          width: "max-content",
          height: `${TRACK_H}px`,
        }}
      >
        {doubledProjects.map((project, index) => (
          <CarouselCard
            key={`${project.id ?? index}-${index}`}
            project={project}
            onHoverStart={() => tweenRef.current?.pause()}
            onHoverEnd={() => tweenRef.current?.play()}
          />
        ))}
      </div>
    </div>
  )
}

export default InfiniteCarousel