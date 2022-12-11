import gsap from "gsap";

const OVERLAY = document.querySelector('#overlay-popover')

console.clear()

const CANVAS = document.querySelector('#rain')
const CONTEXT = CANVAS.getContext('2d')

const CONFIG = {
  HUE: 120,
  SIZE: [1, 3],
  WINDOW: [0, 1],
  SHADOW: 0.25,
  FPS: 24,
  PROBABILITY: 0.2,
  STACK_LIMIT: 100,
  ALPHA_DROP: 0.04,
}

const GLYPHS = 'ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ'.split('')

const DigitalRain = function({ el }) {
  const self = this
  /**
   * Create three canvases
   * 1. The element we attach to
   * 2. The highlighter canvas
   * 3. The green renderer
   * */
  self.canvas = el
  self.context = el.getContext('2d')
  // Create the highlighter and the trailer
  self.highlightCanvas = document.createElement('canvas')
  self.highlightContext = self.highlightCanvas.getContext('2d')
  self.trailCanvas = document.createElement('canvas')
  self.trailContext = self.trailCanvas.getContext('2d')
}

DigitalRain.prototype.size = function () {
  const { height, width } = self.canvas.getBoundingClientRect();
  self.highlightCanvas.height = self.trailCanvas.height = self.canvas.height = height;
  self.highlightCanvas.width = self.trailCanvas.width = self.canvas.width = width;
}

DigitalRain.prototype.render = function () {
  
}

const STACKS = []
// Create a secondary offscreen canvas that can be drawn to and overlaid on each frame
const HIGHLIGHT_CANVAS = document.createElement('canvas')
const HIGHLIGHT_CONTEXT = HIGHLIGHT_CANVAS.getContext('2d')
// Create a trail canvas
const TRAIL_CANVAS = document.createElement('canvas')
const TRAIL_CONTEXT = TRAIL_CANVAS.getContext('2d')

const RainStack = function({ id, size, index }) {
  const self = this
  // Now you need to make some kind of structure that maps out
  self.id = id
  self.index = index
  self.size = Math.floor((Math.min(window.innerWidth, window.innerHeight) / 100) * size)
  // Generate a random x position
  self.x = gsap.utils.random(window.innerWidth * CONFIG.WINDOW[0], window.innerWidth * CONFIG.WINDOW[1], 1)
  self.y = -self.size
  // Create a canvas and context to be updated too
  self.canvas = document.createElement('canvas')
  self.context = self.canvas.getContext('2d')
  // Create a higlighter canvas
  self.highlightCanvas = document.createElement('canvas')
  self.highlightContext = self.highlightCanvas.getContext('2d')
  // Set common props
  self.canvas.width = self.canvas.height = self.highlightCanvas.width = self.highlightCanvas.height = self.size
  self.context.font = self.highlightContext.font = `${self.size}px monospace`
  self.context.textAlign = self.highlightContext.textAlign = 'center'
  self.context.fillStyle = `hsl(${CONFIG.HUE}, 100%, 70%)`
  self.highlightContext.fillStyle = `hsl(${CONFIG.HUE}, 100%, 100%)`
  // Set the highlighter shadow
  self.highlightContext.shadowOffsetX = 0
  self.highlightContext.shadowOffsetY = 0
  self.highlightContext.shadowBlur = self.size * CONFIG.SHADOW
  self.highlightContext.shadowColor = 'white'
  return self
}

RainStack.prototype.render = function(context, highlighter) {
  const self = this
  // Update internal canvas
  self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)
  // Only need to write one character...
  self.context.fillText(
    gsap.utils.wrap(GLYPHS, self.index),
    self.canvas.width * 0.5,
    self.canvas.height
  )
  // Fill the highlighter too but don't render it yet
  self.highlightContext.clearRect(0, 0, self.canvas.width, self.canvas.height)
  self.highlightContext.fillText(
    gsap.utils.wrap(GLYPHS, self.index),
    self.canvas.width * 0.5,
    self.canvas.height
  )
  // Draw to provided context
  context.drawImage(self.canvas, self.x - (self.canvas.width * 0.5), self.y)
  // Render highlighter to the highlighter canvas
  highlighter.drawImage(self.highlightCanvas, self.x - (self.canvas.width * 0.5), self.y)
}

const SIZE = () => {
  const { height, width } = CANVAS.getBoundingClientRect();
  TRAIL_CANVAS.height = HIGHLIGHT_CANVAS.height = CANVAS.height = height;
  TRAIL_CANVAS.width = HIGHLIGHT_CANVAS.width = CANVAS.width = width;

}

const RENDER = () => {
  if ((Math.random() > CONFIG.PROBABILITY) && STACKS.length <= CONFIG.STACK_LIMIT) {
    const size = gsap.utils.random(CONFIG.SIZE[0], CONFIG.SIZE[1])
    const NEW_STACK = new RainStack({
      id: Date.now(),
      size,
      index: gsap.utils.random(0, GLYPHS.length, 1)
    })
    STACKS.push(NEW_STACK)
  }
  // Clear the highlighter and context but not the trail
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)
  HIGHLIGHT_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)
  // Trick here is to overlay transparent rectangle on whatever we had before
  TRAIL_CONTEXT.fillStyle = `hsla(0, 0%, 0%, ${CONFIG.ALPHA_DROP})`
  TRAIL_CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)
  // Loop through the stacks and render them
  STACKS.forEach(stack => {
    if (stack.y > window.innerHeight) STACKS.splice(STACKS.findIndex(stacker => stacker.id === stack.id), 1)
    stack.index = gsap.utils.wrap(0, GLYPHS.length, stack.index - 1)
    stack.y += stack.size
    stack.render(TRAIL_CONTEXT, HIGHLIGHT_CONTEXT)
  })
  // Overlay the highlights on top
  CONTEXT.drawImage(TRAIL_CANVAS, 0, 0)
  CONTEXT.drawImage(HIGHLIGHT_CANVAS, 0, 0)
}

const INIT = () => { 
  SIZE()
  gsap.ticker.add(RENDER);
  // gsap.ticker.fps(CONFIG.FPS)
};

INIT();

window.addEventListener("resize", () => {
  if (CANVAS) SIZE()
});
