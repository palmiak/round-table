import gsap from "gsap";

console.clear()

const CANVAS = document.querySelector('#rain')

const CONFIG = {
  HUE: 120,
  SIZE: [1, 3],
  WINDOW: [0, 1],
  SHADOW: 0.25,
  FPS: 24,
  PROBABILITY: 0.2,
  STREAM_LIMIT: 100,
  ALPHA_DROP: 0.04,
}

const RATIO = window.devicePixelRatio || 1;

const GLYPHS = 'ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ'.split('')

/* Rain Stream Class */
const RainStream = function({ id, hue, size, index, x }) {
  const self = this
  // Now you need to make some kind of structure that maps out
  self.id = id
  self.index = index
  self.size = size
  // Generate a random x position
  self.x = x
  self.y = self.size * -10
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
  self.context.fillStyle = `hsl(${hue}, 100%, 70%)`
  self.highlightContext.fillStyle = `hsl(${hue}, 100%, 100%)`
  return self
}

RainStream.prototype.render = function(context, highlighter) {
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

/* Digital Rain Class */
const DigitalRain = function({ el, config }) {
  const self = this
  self.config = config
  self.streams = []
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
  // Start the ticker
  return self
}

DigitalRain.prototype.start = function() {
  const self = this
  self.size()
  self.ticker = () => self.tick()
  self.adapter = () => self.size()
  gsap.ticker.add(self.ticker);
  gsap.ticker.fps(self.config.FPS)
  window.addEventListener("resize", self.adapter);
}

DigitalRain.prototype.stop = function() {
  const self = this
  self.streams.length = 0
  gsap.ticker.remove(self.ticker)
  self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)
  window.removeEventListener("resize", self.adapter);
}

DigitalRain.prototype.size = function () {
  const self = this
  const { height, width } = self.canvas.getBoundingClientRect();
  self.highlightCanvas.height = self.trailCanvas.height = self.canvas.height = window.innerHeight * RATIO;
  self.highlightCanvas.width = self.trailCanvas.width = self.canvas.width = window.innerWidth * RATIO;
}

DigitalRain.prototype.tick = function () {
  const self = this
  // Generate a new stream if we need to
  if ((Math.random() > self.config.PROBABILITY) && self.streams.length <= self.config.STREAM_LIMIT) {
    const cMin = Math.min(self.canvas.width, self.canvas.height) / 100
    const size = gsap.utils.random(self.config.SIZE[0], self.config.SIZE[1])
    const NEW_STREAM = new RainStream({
      id: Date.now(),
      size: Math.floor(cMin * size),
      x: gsap.utils.random(self.canvas.width * self.config.WINDOW[0], self.canvas.width * self.config.WINDOW[1], 1),
      hue: 120,
      index: gsap.utils.random(0, GLYPHS.length, 1)
    })
    self.streams.push(NEW_STREAM)
  }
  // Clear the highlighter and trail context but not the trail
  self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)
  self.highlightContext.clearRect(0, 0, self.canvas.width, self.canvas.height)
  // Trick here is to overlay transparent rectangle on whatever we had before
  self.trailContext.fillStyle = `hsla(0, 0%, 0%, ${self.config.ALPHA_DROP})`
  self.trailContext.fillRect(0, 0, self.canvas.width, self.canvas.height)
  // Loop through the stacks and render them
  self.streams.forEach(stream => {
    if (stream.y > self.canvas.height) self.streams.splice(self.streams.findIndex(currentStream => currentStream.id === stream.id), 1)
    stream.index = gsap.utils.wrap(0, GLYPHS.length, stream.index - 1)
    stream.y += stream.size
    stream.render(self.trailContext, self.highlightContext)
  })
  // Overlay the highlights on top
  self.context.drawImage(self.trailCanvas, 0, 0)
  self.context.drawImage(self.highlightCanvas, 0, 0)
}

// Creat new rain
window.myDigitalRain = new DigitalRain({ el: CANVAS, config: CONFIG })

let checker;
let screensaverTimeout;
const SCREENSAVER_THRESHOLD = 4000;
const EVENT_TYPES = [
  "pointermove",
  "keypress",
  "keydown",
  "keyup",
  "scroll",
  "click"
];

const setSaverTimer = () => {
  if (screensaverTimeout) {
    clearTimeout(screensaverTimeout);
    document.body.classList.remove("timing");
  }

  if (!CANVAS.matches(":open")) {
    screensaverTimeout = setTimeout(() => {
      document.body.classList.remove("timing");
      CANVAS.showPopover();
    }, SCREENSAVER_THRESHOLD);
    requestAnimationFrame(() => {
      document.body.classList.add("timing");
    });
  }
};

document.documentElement.style.setProperty(
  "--threshold",
  SCREENSAVER_THRESHOLD
);
EVENT_TYPES.forEach((e) => document.body.addEventListener(e, setSaverTimer));
setSaverTimer()

CANVAS.addEventListener('beforetoggle', e => {
  if (e.newState === 'open') {
    myDigitalRain.start()
  } else {
    myDigitalRain.stop()
    requestAnimationFrame(() => setSaverTimer())
  }
})