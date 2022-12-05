import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';

const POPOVER = document.querySelector('.preview')
POPOVER.showPopover()

if (gsap.registerPlugin) {
  gsap.registerPlugin(Draggable)
  gsap.registerPlugin(InertiaPlugin)
}

const ANCHOR = document.querySelector('p')

// const draggable = new Draggable(ANCHOR, {
//   // trigger: TOOLBAR,
//   bounds: window,
//   type: 'left,top',
//   inertia:true,
//   onPress() {
//     gsap.killTweensOf(ANCHOR);
//     this.update();
//   },
// });