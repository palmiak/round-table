const clamp = (min, max, value) => Math.min(Math.max(value, min), max)
const mapRange = (inputLower, inputUpper, outputLower, outputUpper, value) => {
  const INPUT_RANGE = inputUpper - inputLower
  const OUTPUT_RANGE = outputUpper - outputLower
  return clamp(outputLower, outputUpper, outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0))
}


let wandFrame
let canvas = document.querySelector('canvas[popover')
let context = canvas.getContext('2d')

const blocks = [];

const createBlock = ({ x, y, movementX, movementY }) => {
  const LOWER_SIZE = canvas.height * 0.025
  const UPPER_SIZE = canvas.height * 0.1
  const size = mapRange(0, 100, LOWER_SIZE, UPPER_SIZE, Math.max(Math.abs(movementX), Math.abs(movementY)))
  const rate = mapRange(LOWER_SIZE, UPPER_SIZE, 1, 5, size)
  const { left, top, width, height } = canvas.getBoundingClientRect()
  
  const block = {
    hue: Math.random() * 359,
    x: x - left,
    y: y - top,
    size,
    rate,
  }
  blocks.push(block)
}
const drawBlocks = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  
  for (let b = 0; b < blocks.length; b++) {
    const block = blocks[b]
    context.strokeStyle = context.fillStyle = `hsla(${block.hue}, 80%, 80%, 0.5)`
    context.beginPath()
    context.arc(block.x, block.y, block.size * 0.5, 0, 2 * Math.PI)
    context.stroke()
    context.fill()
    block.size -= block.rate
    block.y += block.rate
    if (block.size <= 0) {
      blocks.splice(b, 1)
    }
  }
  wandFrame = requestAnimationFrame(drawBlocks)
}

const init = () => {
  const { height, width } = canvas.getBoundingClientRect()
  canvas.height = height
  canvas.width = width
  context = canvas.getContext('2d')
  blocks.length = 0
  if (wandFrame) cancelAnimationFrame(wandFrame)
  wandFrame = requestAnimationFrame(drawBlocks)
  document.body.addEventListener("pointermove", createBlock);
  // Listen for any pop-ups that are opened and make sure the canvas sits higher
  document.body.addEventListener("beforetoggle", (e) => {
    if (e.newState === "open" && canvas.matches(":open") && e.target !== canvas) {
      canvas.hidePopover();
      requestAnimationFrame(() => {
        canvas.showPopover();
      });
    }
  });
}
init();

canvas.showPopover();

window.addEventListener("resize", () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
