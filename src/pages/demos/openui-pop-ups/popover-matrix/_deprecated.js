import gsap from "gsap";

const OVERLAY = document.querySelector('#overlay-popover')

console.clear()

const CANVAS = document.querySelector('#rain')
const CONTEXT = CANVAS.getContext('2d')

const CONFIG = {
  HUE: 120,
  SPEED: [0.1, 0.1],
  SIZE: [1, 3],
  LENGTH: [10, 120],
  WINDOW: [0.05, 0.95],
  SHADOW: 0.25,
  FPS: 6,
  PROBABILITY: 0.2,
  STACK_LIMIT: 100,
}

const GLYPHS = 'ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ'.split('')

const STACKS = []

const RainStack = function({ id, length, size, speed, index }) {
  const self = this
  // Now you need to make some kind of structure that maps out
  self.length = length
  self.speed = speed
  self.id = id
  self.index = index
  self.size = Math.floor((Math.min(window.innerWidth, window.innerHeight) / 100) * size)
  self.startIndex = index
  // Generate a random x position
  self.x = gsap.utils.random(window.innerWidth * CONFIG.WINDOW[0], window.innerWidth * CONFIG.WINDOW[1], 1)
  self.y = (self.length * self.size) * -1
  // Create a canvas and context to be updated too
  self.canvas = document.createElement('canvas')
  self.canvas.width = self.size + (self.size * CONFIG.SHADOW)
  self.canvas.height = (self.length + 1) * self.size
  self.context = self.canvas.getContext('2d')
  self.context.font = `${self.size}px monospace`
  self.context.textAlign = 'center'
  self.context.shadowOffsetX = 0
  self.context.shadowOffsetY = 0
  self.context.shadowBlur = self.size * CONFIG.SHADOW
  self.alphaMapper = gsap.utils.mapRange(3, self.length, 1, 0)
  // Kick off the updater and set a speed to move
  self.updateSpeed = self.speed
  self.startUpdate()
  return self
}

RainStack.prototype.kill = function() {
  const self = this
  clearInterval(self.updater)
  // Find the correct stack and remove it
  STACKS.splice(STACKS.findIndex(stack => stack.id === self.id), 1)
}

// Kicks off a little loop for updating a stack's index
RainStack.prototype.startUpdate = function() {
  const self = this
  self.updater = setInterval(() => {
    if (self.y > window.innerHeight) self.kill()
    self.index = gsap.utils.wrap(0, GLYPHS.length, self.index - 1)
    self.y = self.y + self.size
  }, self.updateSpeed * 1000)
}

RainStack.prototype.render = function(context) {
  const self = this
  // Update internal canvas
  self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)
  // Debugging square
  for (let g = 0; g < self.length; g++) {
    const alpha = self.alphaMapper(g)
    self.context.fillStyle = `hsla(${CONFIG.HUE}, 100%, ${g === 0 ? 100 : 70}%, ${alpha})`
    if (g === 0) {
      self.context.shadowColor = `hsl(${CONFIG.HUE}, 100%, 90%)`
      self.context.fillText(
        gsap.utils.wrap(GLYPHS, g === 0 ? self.startIndex : self.index + g),
        self.canvas.width * 0.5,
        self.canvas.height - (self.size * CONFIG.SHADOW) - (g * self.size)
      )
    }
    self.context.shadowColor = g === 0 ? 'hsl(0 0% 100%)' : 'transparent'
    self.context.fillText(
      gsap.utils.wrap(GLYPHS, g === 0 ? self.startIndex : self.index + g),
      self.canvas.width * 0.5,
      self.canvas.height - (self.size * 0.25) - (g * self.size)
    )
  }
  // Draw to provided context
  context.drawImage(self.canvas, self.x - (self.canvas.width * 0.5), self.y)
}

const SIZE = () => {
  const { height, width } = CANVAS.getBoundingClientRect();
  CANVAS.height = height;
  CANVAS.width = width;
}


const RENDER = () => {
  if ((Math.random() > CONFIG.PROBABILITY) && STACKS.length <= CONFIG.STACK_LIMIT) {
    // Create a new stack and add it.
    // It needs a length, speed, starting glyph index
    const size = gsap.utils.random(CONFIG.SIZE[0], CONFIG.SIZE[1])
    // const speed = gsap.utils.mapRange(CONFIG.SIZE[0], CONFIG.SIZE[1], CONFIG.SPEED[1], CONFIG.SPEED[0])(size).toFixed(2)
    const speed = gsap.utils.random(CONFIG.SPEED[0], CONFIG.SPEED[1])
    const NEW_STACK = new RainStack({
      id: Date.now(),
      length: gsap.utils.random(CONFIG.LENGTH[0], CONFIG.LENGTH[1], 1),
      speed,
      size,
      index: gsap.utils.random(0, GLYPHS.length, 1)
    })
    STACKS.push(NEW_STACK)
  }
  // Loop through the stacks and render them
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)
  STACKS.forEach(stack => {
    stack.render(CONTEXT)
  })
}

const INIT = () => { 
  SIZE()
  gsap.ticker.add(RENDER);
  gsap.ticker.fps(CONFIG.FPS)
};

INIT();

window.addEventListener("resize", () => {
  if (CANVAS) SIZE()
});
