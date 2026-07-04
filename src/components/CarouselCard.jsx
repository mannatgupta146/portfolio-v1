"use client"

import { useRef } from "react"
import TextReveal from "./TextReveal"
import gsap from "@/libs/gsap"

const CARD_W = 200
const CARD_H = 200
const SCALE = 1.35

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {

    const cardRef = useRef(null)
    const imgRef = useRef(null)
    const numberRef = useRef(null)
    const titleRef = useRef(null)

    const onEnter = () => {
        onHoverStart()

        gsap.to(cardRef.current, {
            width: CARD_W * SCALE,
            height: CARD_H * SCALE,
            scale: SCALE,
            duration: 0.5,
            ease: "power3.out"
        })

        numberRef.current?.play()
        titleRef.current?.play()
    }

    const onLeave = () => {
        onHoverEnd()

        gsap.to(cardRef.current, {
            width: CARD_W,
            height: CARD_H,
            scale: SCALE,
            duration: 0.25,
            ease: "power3.out"
        })

        numberRef.current?.reverse()
        titleRef.current?.reverse()
    }

  return (
    <div ref={cardRef} 
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    style={{ 
        width: CARD_W, 
        height: CARD_H, 
        scale: SCALE, 
        flexShrink: 0, 
        overflow: visible, 
        cursor: pointer 
    }} 
    className="relative">
      
        {/* Title Panel */}
        <div style={{ bottom: "calc(100% + 3rem)"}} className="titlePanel absolute left-0 pointer-events-none flex flex-col gap-4">
            <TextReveal ref={numberRef} trigger="manual" splitBy="chars">
                <h3 className="text-2xl font-bold">{project.number}</h3>
            </TextReveal>
            <TextReveal ref={titleRef} trigger="manual" splitBy="chars">
                <h3 className="text-2xl font-bold">{project.title}</h3>
            </TextReveal>
        </div>

        <div className="imgDiv absolute height-full w-full overflow-hidden">
            <img className="h-full w-full object-cover " ref={imgRef} src={project.coverImage} alt={project.title} />
        </div>

    </div>
  )
}

export default CarouselCard