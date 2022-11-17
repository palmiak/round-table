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