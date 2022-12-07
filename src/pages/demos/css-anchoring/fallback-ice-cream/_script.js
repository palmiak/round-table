import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';


if (gsap.registerPlugin) {
  gsap.registerPlugin(Draggable)
  gsap.registerPlugin(InertiaPlugin)
}

const ANCHOR = document.querySelector('.anchor')

const draggable = new Draggable(ANCHOR, {
  // trigger: TOOLBAR,
  bounds: window,
  type: 'top',
  inertia:true,
  onPress() {
    gsap.killTweensOf(ANCHOR);
    this.update();
  },
});


const OPTIONS = {
  root: document.querySelector('main'),
  threshold: 1.0
}

const SIGH = new Audio(
  new URL('/shared/audio/sigh.mp3', import.meta.url)
)
const WOW = new Audio(
  new URL('/shared/audio/anime-wow-sound-effect.mp3', import.meta.url)
)
const CREAM = document.querySelector('.anchored')
const OBSERVER = new IntersectionObserver((entries,a) => {
  if (CREAM.dataset.intersected === "false") {
    CREAM.dataset.intersected = true
  } else {
    CREAM.className = entries[0].isIntersecting ? 'anchored anchored--happy' : 'anchored anchored--sad'
    WOW.pause()
    SIGH.pause()
    WOW.currentTime = SIGH.currentTime = 0
    if (!entries[0].isIntersecting) {
      SIGH.play()
    } else {
      WOW.play()
    }
  }
}, OPTIONS)
OBSERVER.observe(CREAM)