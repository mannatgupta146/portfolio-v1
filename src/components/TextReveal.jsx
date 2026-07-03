"use client"

import gsap, { ScrollTrigger, SplitText } from "@/libs/gsap"
import { useGSAP } from "@gsap/react"
import { forwardRef, useRef } from "react"

const TextReveal = forwardRef((
    {
        children,
        classname = "",
        trigger = "mount",
        scrollStart = "top 80%",
        splitBy = "lines",
        duration = 0.7,
        stagger = 0.1,
        delay = 0,
        ease = "power3.out",
    }, ref) => {

  const wrapperRef = useRef(null)
  const splitRef = useRef(null)
  const tlRef = useRef(null)

  useGSAP(() => {
    splitRef.current = new SplitText(wrapperRef.current, { 
        type: splitBy,
        lineThreshold: 0.3,
    })

    const elements = splitRef.current[splitBy]

    gsap.set(elements, {
        yPercent: 110,
    })

    tlRef.current = gsap.timeline({
        paused: true,
        defaults: {
            delay
        }
    })

    tlRef.current.to(elements, {
        yPercent: 0,
        opacity: 1,
        duration,
        ease,
        stagger: {
            each: stagger,
            from: "start",
        }
    })

    if(trigger === "mount") {
        tlRef.current.play()
    }

    if(trigger === "scroll") {
        ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: scrollStart,
            once: true,
            onEnter: () => tlRef.current?.play(),
        })
    }

    return () => {
        tlRef.current?.kill()
        splitRef.current?.revert()
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }

  }, {
    scope: wrapperRef,
    dependencies: [trigger, scrollStart, splitBy, duration, stagger, delay, ease]
  })

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${classname}`}>
      {children}
    </div>
  )
})

export default TextReveal