const BUTTON = document.querySelector('body > button')
const SHAKE_IT = document.querySelector('.shake-it')

const mapRange = (inputLower, inputUpper, outputLower, outputUpper) => {
  const INPUT_RANGE = inputUpper - inputLower
  const OUTPUT_RANGE = outputUpper - outputLower
  return value => outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
}

let start
let count = 0
let cancel

const PUSH_IT = new Audio(
  new URL('/shared/audio/push-it.mp3', import.meta.url)
)

const RESET = () => {
  start = undefined
  count = 0
  if (cancel) clearTimeout(cancel)
}

SHAKE_IT.addEventListener('popovershow', () => {
  PUSH_IT.pause()
  PUSH_IT.currentTime = 0
  PUSH_IT.play()
})

SHAKE_IT.addEventListener('popoverhide', () => {
  PUSH_IT.pause()
  PUSH_IT.currentTime = 0
})

const pushItRealGood = () => {
  if (!SHAKE_IT.matches(':open')) {
    SHAKE_IT.showPopover()
  }
}

const handleMotion = ({ acceleration: { x }}) => {
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
        window.addEventListener('devicemotion', handleMotion, true) 
      }
    })
  } else {
    window.addEventListener('devicemotion', handleMotion, true)
  }
}

BUTTON.addEventListener('click', START)
BUTTON.showPopover()