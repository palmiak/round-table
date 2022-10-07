import gsap from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'

console.clear()

if (gsap.registerPlugin) gsap.registerPlugin(Draggable)

const PORTAL = document.querySelector('.portal')
const PROXY = Object.assign(document.createElement('div'), {
  className: 'sr-only proxy'
})

document.body.appendChild(PROXY)

let active = false
let angle = 0
let start = {x: null, y: null}
let center = {x: null, y: null}
let oops = false
Draggable.create(PROXY, {
  trigger: document.body,
  type: 'rotation',
  onDragStart: function({x, y}) {
    start.x = center.x = center.y = start.y = null
    start = { x, y }
    angle = 0
  },
  onClick: function() {
    if (PORTAL.matches(':open')) {
      PORTAL.hidePopUp()
    }
  },
  onDrag: function({ x, y })  {
    if (oops) return
    const diff = (Math.floor(Math.abs(this.rotation)) - angle)
    if (diff <= 4 && diff >= 0) {
      angle = Math.floor(Math.abs(this.rotation))
    } else {
      oops = true
      tearDown()
    }
    if (angle >= 5 && center.x === null && center.y === null) {
      if (x > start.x) {
        // console.info('vert from y')
        center.x = start.x
        center.y = start.y + 100
      } else if (x < start.x) {
        // console.info('left from x')
        center.x = start.x - 100
        center.y = start.y
      }
      document.documentElement.style.setProperty('--center-x', center.x)
      document.documentElement.style.setProperty('--center-y', center.y)
      PORTAL.showPopUp()
      gsap.ticker.add(RENDER)
    }
    if (angle >= 5) {
      for (let i = 0; i < angle; i++) {
        if (SPOTS[i] && !SPOTS[i].active) {
          ACTIVATE_SPOT(SPOTS[i])
        }
      }
      document.documentElement.style.setProperty('--open', gsap.utils.clamp(0, 1, gsap.utils.mapRange(130, 330, 0, 1)(angle)))
    }
    if (angle >= 360) {
      document.documentElement.style.setProperty('--open', 1)
      active = true
    }
  },
  onDragEnd: () => {
    if (!active) {
      tearDown()
    }
    if (active) {
      active = false
    }
    if (oops) oops = false
    gsap.set(PROXY, { rotation: 0 })
  }
})

const tearDown = () => {
  CONTEXT.clearRect(0, 0, window.innerWidth, window.innerHeight)
  gsap.ticker.remove(RENDER)
  if (PORTAL.matches(':open')) PORTAL.hidePopUp()
  for (let i = 0; i < SPOTS.length; i++) {
    SPOTS[i].active = false
  }
  gsap.to(document.documentElement, {
    '--open': 0,
    duration: 0.25,
  })
}

PORTAL.addEventListener('hide', tearDown)

const CANVAS = document.querySelector('canvas')
const CONTEXT = CANVAS.getContext('2d')

CANVAS.height = window.innerHeight
CANVAS.width = window.innerWidth

// Points round a circle...
/**
 * x: radius * Math.cos(angle ( / 180 ?))
 * y: radius * Math.sin(angle ( / 180 ?))
 * */
const COUNT = 360
const RADIUS = 150

const genSparks = index => {
  const COUNT = gsap.utils.random(1, 10, 1)
  return new Array(COUNT).fill().map(spark => {
    // Base the angle on 0 so upwards would be 270 
    const angle = gsap.utils.random(235, 270) + (index - 90)
    const travel = gsap.utils.random(50, 250)
    return {
      travel,
      x: 0,
      y: 0,
      size: gsap.utils.random(2, 8),
      glow: `
        ${gsap.utils.random(15, 45)}
        ${gsap.utils.random(70, 100)}%
        ${gsap.utils.random(55, 95)}%
      `,
      // Given angle and radius, you know destinationX/Y,
      destinationX: travel * Math.cos(angle * Math.PI / 180),
      destinationY: travel * Math.sin(angle * Math.PI / 180),
      alpha: 1,
      speed: gsap.utils.random(0.1, 1),
    }
  })
}

const ACTIVATE_SPOT = (spot) => {
  spot.active = true
  const { sparks } = spot
  sparks.forEach((spark) => {
    if (spark.timeline) spark.timeline.kill()
    spark.timeline = gsap.timeline({
      repeat: -1
    })
      .set(spark, {
        x: 0,
        y: 0,
      })
      .to(spark, {
        x: spark.destinationX,
        y: spark.destinationY,
        duration: spark.speed,
      })
      .to(spark, {
        alpha: 0,
        duration: spark.speed * 0.1,
      }, `>-${spark.speed * 0.1}`)

  })
}

const SPOTS = new Array(COUNT).fill().map((point, index) => {
  return {
    originX: RADIUS * Math.cos((index - 90) * Math.PI / 180),
    originY: RADIUS * Math.sin((index - 90) * Math.PI / 180),
    sparks: genSparks(index),
    active: false,
  }
})
// Work out velocity ranges based on current position.
// So say it's between -15 and 15. Then plus the current index.

// How to get velocity x and y? Get the point from the angle
// and distance. Then use this to calculate the velocity. Even better
// Given point and angle. Just throw in the destination based on
// current position...

const RENDER = () => {
  CONTEXT.clearRect(0, 0, window.innerWidth, window.innerHeight)
  // const CENTER = {
  //   x: window.innerWidth * 0.5,
  //   y: window.innerHeight * 0.5
  // }
  const CENTER = {
    x: center.x,
    y: center.y
  }
  SPOTS.forEach(({originX, originY, sparks, active}) => {
    if (active) {
      sparks.forEach(spark => {
        CONTEXT.fillStyle = `hsl(${spark.glow} / ${spark.alpha})`
        CONTEXT.fillRect(
          CENTER.x + originX + spark.x,
          CENTER.y + originY + spark.y,
          spark.size,
          spark.size
        )
      })
    }
  })
}

// gsap.ticker.add(RENDER)

window.addEventListener('resize', () => {
  CANVAS.width = window.innerWidth
  CANVAS.height = window.innerHeight
})

gsap.ticker.fps(60)