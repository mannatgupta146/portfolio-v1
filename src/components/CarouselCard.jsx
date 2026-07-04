"use client"

import { useRef } from "react"
import TextReveal from "./TextReveal"
import gsap from "@/libs/gsap"

const CARD_W = 300
const CARD_H = 300
const HOVER_SCALE = 1.25

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null)
  const numberRef = useRef(null)
  const titleRef = useRef(null)

  const onEnter = () => {
    onHoverStart?.()

    gsap.killTweensOf(cardRef.current)

    gsap.to(cardRef.current, {
      scale: HOVER_SCALE,
      duration: 0.5,
      ease: "power3.out",
      zIndex: 10,
      overwrite: "auto"
    })

    numberRef.current?.play()
    titleRef.current?.play()
  }

  const onLeave = () => {
    onHoverEnd?.()

    gsap.killTweensOf(cardRef.current)

    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
      zIndex: 1,
      overwrite: "auto"
    })

    numberRef.current?.reverse()
    titleRef.current?.reverse()
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative shrink-0 cursor-pointer origin-center"
      style={{
        width: CARD_W,
        height: CARD_H,
      }}
    >
      {/* Title Panel */}
      <div
        className="absolute left-0 pointer-events-none flex flex-col gap-4"
        style={{ bottom: "calc(100% + 3rem)" }}
      >
        <TextReveal ref={numberRef} trigger="manual" splitBy="chars">
          <h3 className="text-sm">{project.number}</h3>
        </TextReveal>

        <TextReveal ref={titleRef} trigger="manual" splitBy="words">
          <h3 className="text-2xl font-bold">{project.title}</h3>
        </TextReveal>
      </div>

      {/* Image */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default CarouselCard