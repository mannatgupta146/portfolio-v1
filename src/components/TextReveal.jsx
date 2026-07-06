"use client"

import gsap, { ScrollTrigger, SplitText } from "@/libs/gsap"
import { useGSAP } from "@gsap/react"
import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react"

const TextReveal = forwardRef(
  (
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
    },
    ref
  ) => {
    const wrapperRef = useRef(null)
    const splitRef = useRef(null)
    const tlRef = useRef(null)
    const scrollTriggerRef = useRef(null)

    useImperativeHandle(ref, () => ({
      play: () => tlRef.current?.play(),
      reverse: () => tlRef.current?.reverse(),
      reset: () => tlRef.current?.pause(0),
    }))

    useGSAP(
      () => {
        splitRef.current = new SplitText(wrapperRef.current, {
          type: splitBy,
          mask: splitBy,
          lineThreshold: 0.3,
        })

        const elements = splitRef.current[splitBy]

        gsap.set(elements, {
          yPercent: 110,
          opacity: 0,
        })

        tlRef.current = gsap.timeline({
          paused: true,
          delay,
        })

        tlRef.current.to(elements, {
          yPercent: 0,
          opacity: 1,
          duration,
          ease,
          stagger: {
            each: stagger,
            from: "start",
          },
        })

        if (trigger === "mount") {
          tlRef.current.play()
        }

        if (trigger === "scroll") {
          scrollTriggerRef.current = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: scrollStart,
            once: true,
            onEnter: () => tlRef.current?.play(),
          })
        }

        return () => {
          tlRef.current?.kill()
          scrollTriggerRef.current?.kill()
          splitRef.current?.revert()
        }
      },
      {
        scope: wrapperRef,
        dependencies: [
          trigger,
          scrollStart,
          splitBy,
          duration,
          stagger,
          delay,
          ease,
        ],
      }
    )

    return (
      <div ref={wrapperRef} className={classname}>
        {children}
      </div>
    )
  }
)

TextReveal.displayName = "TextReveal"

export default TextReveal