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
  type: 'left,top',
  inertia:true,
  onPress() {
    gsap.killTweensOf(ANCHOR);
    this.update();
  },
});

const OPTIONS = {
  root: document.body,
  threshold: 1.0
}

const BOAT = document.querySelector('.anchored')
const OBSERVER = new IntersectionObserver((entries) => {
  BOAT.className = entries[0].isIntersecting ? 'anchored anchored--happy' : 'anchored anchored--sad'
}, OPTIONS)
OBSERVER.observe(BOAT)