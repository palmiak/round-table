const BUTTON = document.querySelector('body > button')
const NOTIFICATIONS = document.querySelector('#notifications')
const FIREBALL = document.querySelector('#fireball')

const mapRange = (inputLower, inputUpper, outputLower, outputUpper) => {
  const INPUT_RANGE = inputUpper - inputLower
  const OUTPUT_RANGE = outputUpper - outputLower
  return value => outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
}

/**
 * Hadouken specific things
 * */
let currentRotation
let currentRotationRateAlpha
let currentRotationRateBeta

const FIREBALL_MAP = mapRange(800, 1400, 1, 4)

// Use Z plane to catch the jump
const ROTATION_RATE_THRESHOLD_ALPHA = -800
const ROTATION_RATE_THRESHOLD_BETA = -100
// The Y axis rotation threshold
const ROTATION_THRESHOLD = 80
const FLEX = 20

let flicked = false
let flickTimer

const RYU = new Audio(new URL('/shared/audio/hadouken.mp3', import.meta.url))

const resetHadouken = () => {
  RYU.currentTime = 0
  RYU.removeEventListener('ended', resetHadouken)
  flicked = false
  FIREBALL.hidePopover()
  FIREBALL.removeEventListener('animationend', resetHadouken)
  FIREBALL.classList.remove('fireball--firing')
}


const detectHadouken = () => {
  console.info('Detecting..', currentRotationRateAlpha, currentRotationRateBeta)
  if (currentRotationRateAlpha <= ROTATION_RATE_THRESHOLD_ALPHA &&
      currentRotationRateBeta <= ROTATION_RATE_THRESHOLD_BETA) {
    flicked = true
    console.info('active')
    RYU.play()
    FIREBALL.showPopover()
    document.documentElement.style.setProperty('--scale', FIREBALL_MAP(Math.abs(currentRotationRateAlpha)))
    FIREBALL.classList.add('fireball--firing')
    FIREBALL.addEventListener('animationend', resetHadouken)
  }
}

/* Finish Hadouken specific things */

let start
let count = 0
let cancel

const BELL = new Audio('/shared/audio/bell.mp3')


const RESET = () => {
  start = undefined
  count = 0
  if (cancel) clearTimeout(cancel)
}

const pushItRealGood = () => {
  if (!NOTIFICATIONS.matches(':open')) {
    NOTIFICATIONS.showPopover()
  }
}

// States can be "open" or "closed"
NOTIFICATIONS.addEventListener('beforetoggle', ({ currentState, newState }) => {
  BELL.pause()
  BELL.currentTime = 0
  if (newState === 'open') setTimeout(() => BELL.play(), 250)
})

const handleMotion = ({ acceleration: { x, y }, rotationRate: { alpha, beta }}) => {
  // Shake detection
  const shakeTime = Date.now()
  if (Math.abs(x) > 50) {
    if (cancel) clearTimeout(cancel)
    if (!start) {
      start = shakeTime
      count++
    } else if (shakeTime - start < 500) {
      count++
      if (count > 5) {
        RESET()
        pushItRealGood()
      }
    }
    cancel = setTimeout(RESET, 1000)
  }
  // Flick Detection
  currentRotationRateAlpha = alpha
  currentRotationRateBeta = beta
}

/* Hadouks specific handling */
const handleOrientation = ({ beta }) => {
  currentRotation = Math.round(beta)
  if ((currentRotation <= ROTATION_THRESHOLD + FLEX) && 
      (currentRotation >= ROTATION_THRESHOLD - FLEX) && !flicked) detectHadouken()
}

/**
 * Cater for iOS being "fussy" by adding a button to kick things off h/t @Vanaf1979
 * */
const START = () => {
  BUTTON.hidePopover()
  BUTTON.remove()
  if (DeviceOrientationEvent?.requestPermission && DeviceMotionEvent?.requestPermission) {
    Promise.all([
      DeviceOrientationEvent.requestPermission(),
      DeviceMotionEvent.requestPermission(),
    ]).then(results => {
      if (results.every(result => result === 'granted')) {
        window.addEventListener('deviceorientation', handleOrientation)
        window.addEventListener('devicemotion', handleMotion, true) 
      }
    })
  } else {
    window.addEventListener('deviceorientation', handleOrientation)
    window.addEventListener('devicemotion', handleMotion, true)
  }
}

BUTTON.addEventListener('click', START)
BUTTON.showPopover()