"use client"

import gsap from "@/libs/gsap"
import { useRouter } from "next/navigation"
import { useCallback, useReducer } from "react"

const STRIP_COUNT = 14

const createStrips = () => {
    const overlay = document.createElement("div")
    overlay.className= "transition-overlay"
    overlay.style.cssText = 
    `
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        display: flex;
    `

    for(let i = 0; i < STRIP_COUNT; i++) {
        const strip = document.createElement("div")
        strip.className = "transition-strip"
        strip.style.cssText = 
        `
            flex: 1;
            height: 100%;
            background-color: #010101;
            transform: scaleY(0);
            transform-origin: bottom;
        `
        overlay.appendChild(strip)
    }

    document.body.appendChild(overlay)

    return overlay
}

const removeOverlay = (overlay) => {
    const elem = document.getElementsByClassName("transition-overlay")

    if(elem.length > 0) {
        document.body.removeChild(elem[0])
    }
}

const useViewTransition = () => {

    const router = useRouter()

    const navigateTo = useCallback((href) => {

        const overlay = createStrips()

        const strips = Array.from(overlay.children)

        gsap.to(strips, {
            scaleY: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.inOut",
            stagger: {
                each: 0.08,
                from: "random"
            },
            onComplete: () => {
                router.push(href)

                gsap.to(strips, {
                    scaleY: 0,
                    duration: 0.7,
                    delay: 0.2,
                    ease: "power3.inOut",
                    transformOrigin: "top",
                    stagger: {
                        each: 0.08,
                        from: "random"
                    },
                    onComplete: () => {
                        removeOverlay(overlay)
                    }
                })
            }
        })

    }, [router])

  return { navigateTo }
}

export default useViewTransition