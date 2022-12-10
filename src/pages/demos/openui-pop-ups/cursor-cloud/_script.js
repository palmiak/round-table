import gsap from "gsap";

const OVERLAY = document.querySelector('#overlay-popover')

console.clear()

gsap.defaults({
  duration: 1,
})

let canvas;
let context;
let activeCancel;
const MOVEMENT_THRESHOLD = 20;

const CLOUD = {
  active: false,
  loaded: false,
  image: new Image(),
  direction: {
    x: 1,
    y: 1,
  },
  size: 140,
  position: {
    x: 50,
    y: 50,
  },
  scale: 0,
};


const CanvasCloud = function() {
  const self = this
  this.canvas = document.createElement('canvas')
  this.canvas.width = this.canvas.height = 260
  this.context = this.canvas.getContext('2d')
  this.blinkRatio = 1
  // Create some eyes
  const EYES = document.createElement('canvas')
  EYES.width = 100
  EYES.height = 24
  const EYE_CONTEXT = EYES.getContext('2d')
  EYE_CONTEXT.beginPath()
  EYE_CONTEXT.arc(12, 12, 12, 0, 2 * Math.PI, false)
  EYE_CONTEXT.arc(88, 12, 12, 0, 2 * Math.PI, false)
  EYE_CONTEXT.fill();
  this.eyes = EYES
  this.blink()
  return self
}

CanvasCloud.prototype.blink = function () {
  const self = this
  const delay = gsap.utils.random(1, 5)
  gsap.to(self, {
    delay,
    blinkRatio: 0.1,
    repeat: 3,
    yoyo: true,
    duration: 0.05,
    onComplete: () => {
      self.blink()
    },
  })
}

CanvasCloud.prototype.render = function (image) {
  // 260 is cloud size
  this.context.clearRect(0, 0, 260, 260)
  this.context.drawImage(image, 0, 0)
  this.context.drawImage(this.eyes, 80, 120 + ((1 - this.blinkRatio) * 12), 100, this.blinkRatio * 24)
}

const myCloud = new CanvasCloud()


CLOUD.image.src = '/shared/images/cloud-cursor.svg'
CLOUD.image.onload = function () {
  CLOUD.loaded = true
  gsap.ticker.add(() => myCloud.render(CLOUD.image))
}

const renderCloud = () => {
  if (!CLOUD.loaded) return
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Centers it then base on direction
  context.drawImage(
    myCloud.canvas,
    gsap.utils.clamp(0, canvas.width - CLOUD.size, CLOUD.position.x - CLOUD.size * (CLOUD.scale * 0.5)),
    gsap.utils.clamp(0, canvas.height - CLOUD.size, CLOUD.position.y - CLOUD.size * (CLOUD.scale * 0.5)),
    CLOUD.scale * CLOUD.size,
    CLOUD.scale * CLOUD.size
  );
  // context.drawImage(myCloud.canvas, 0, 0, 100, 100)
};

const resetCloud = () => {
  CLOUD.active = false;
  gsap.to(CLOUD, {
    scale: 0,
    duration: 0.2,
  });
};

const moveCloud = ({ movementX, movementY, x, y }) => {
  if (
    (Math.abs(movementX) >= 20 || Math.abs(movementY) >= 20) &&
    !CLOUD.active && CLOUD.loaded
  ) {
    CLOUD.active = true;
    gsap.to(CLOUD, {
      scale: 1,
      duration: 0.2,
    });
  }
  if (CLOUD.active) {
    // Set a cancel timer
    if (activeCancel) activeCancel.kill();
    activeCancel = gsap.delayedCall(2, resetCloud);
  }
  if (Math.abs(movementX) > MOVEMENT_THRESHOLD) {
    CLOUD.direction.x = movementX >= 0 ? -0.5 : 1.5;
  }
  if (Math.abs(movementY) > MOVEMENT_THRESHOLD) {
    CLOUD.direction.y = movementY >= 0 ? -0.5 : 1.5;
  }
  const positionX = x - CLOUD.size * 0.5 + CLOUD.direction.x * CLOUD.size;
  const positionY = y - CLOUD.size * 0.5 + CLOUD.direction.y * CLOUD.size;
  gsap.to(CLOUD.position, {
    x: positionX,
    y: positionY,
  });
};

const INIT = () => {
  canvas = document.querySelector("canvas[popover]");
  if (!canvas.matches(':open')) {
    console.info('showing')
    canvas.showPopover()
  } 
  context = canvas.getContext("2d");
  const { height, width } = canvas.getBoundingClientRect();
  canvas.height = height;
  canvas.width = width;
  // Event handling
  document.body.addEventListener("pointermove", moveCloud);
  document.body.addEventListener("beforetoggle", e => {
    if (e.newState === "open" && canvas.matches(":open") && e.target !== canvas) {
      canvas.hidePopover();
      requestAnimationFrame(() => {
        canvas.showPopover();
      });
    }
  })
  gsap.ticker.add(renderCloud);
};

INIT();

window.addEventListener("resize", () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
