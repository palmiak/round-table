import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (gsap.registerPlugin) gsap.registerPlugin(ScrollTrigger)

if (gsap.to) {
  gsap.to('.book', {
    scrollTrigger: {
      scrub: 1,
      start: () => 0,
      end: () => window.innerHeight * 0.25,
    },
    scale: 1,
  })

  gsap.to('.logo', {
    scrollTrigger: {
      scrub: true,
      start: () => 13.5 * (window.innerHeight * 0.25),
      end: () => 14 * (window.innerHeight * 0.25),
    },
    opacity: 1,
  })

  const PAGES = [...document.querySelectorAll('.book__page')]
  PAGES.forEach((page, index) => {
    gsap.set(page, { z: index === 0 ? 13 : -index * 1 })
    if (index === 11) return false
    gsap.to(page, {
      rotateY: `-=${180 - index / 2}`,
      scrollTrigger: {
        scrub: 1,
        start: () => (index + 1) * (window.innerHeight * 0.25),
        end: () => (index + 2) * (window.innerHeight * 0.25),
      },
    })
    gsap.to(page, {
      z: index === 0 ? -13 : index,
      scrollTrigger: {
        scrub: 1,
        start: () => (index + 1) * (window.innerHeight * 0.25),
        end: () => (index + 1.5) * (window.innerHeight * 0.25),
      },
    })
  })
}