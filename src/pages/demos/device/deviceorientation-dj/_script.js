import gsap from 'gsap'

const LIMIT = 0.2
const VOLUME_TOGGLE = document.querySelector('.audio-toggle')
const START_BUTTON = document.querySelector('.start')
const INTRO = document.querySelector('.intro')
const INTRO_CONTAINER = document.querySelector('.intro-container')

const TRACK = new Audio(
  new URL('/shared/audio/instrumental.mp3', import.meta.url)
)
TRACK.loop = true
TRACK.muted = false

const toggleMute = () => {
  VOLUME_TOGGLE.setAttribute(
    'aria-pressed',
    VOLUME_TOGGLE.matches('[aria-pressed="true"]') ? false : true
  )
  TRACK.muted = !TRACK.muted
  if (!TRACK.muted) TRACK.play()
}

const genRate = (s) => {
  let rate = 1
  const val = gsap.utils.clamp(-LIMIT, LIMIT, s)
  rate = gsap.utils.mapRange(-LIMIT, LIMIT, -LIMIT, LIMIT)(val)
  return rate
}

let currentRotation
let currentScratch
let scratchEnabled
const FLAT_THRESHOLD = 20
const handleOrientation = ({ alpha, beta }) => {
  currentRotation = Math.round(beta)
  currentScratch = Math.round(alpha)
  if (currentRotation <= FLAT_THRESHOLD && currentRotation >= -FLAT_THRESHOLD) {
    scratchEnabled = true
  } else {
    scratchEnabled = false
  }
  if (!scratchEnabled)
    console.warn('You are outside the scratch zone. Get that phone flat!')
}

let timer
const faceSwap = spinning => {
  gsap.set('.face', { display: spinning ? 'none' : 'block' })
  gsap.set('.face--nauseous', { display: spinning ? 'block' : 'none' })
}

const EYES = document.querySelector('.eyes--open')
const blink = EYES => {
  gsap.set(EYES, { scaleY: 1 })
  if (EYES.BLINK_TL) EYES.BLINK_TL.kill()
  EYES.BLINK_TL = gsap.timeline({
    delay: Math.floor(Math.random() * 5) + 1,
    onComplete: () => blink(EYES),
  })
  EYES.BLINK_TL.to(EYES, {
    duration: 0.05,
    transformOrigin: '50% 50%',
    scaleY: 0,
    yoyo: true,
    repeat: 1,
  })
}
blink(EYES)


gsap.set('.record', { transformOrigin: '50% 50%' })  
gsap.set('.record__shine', { transformOrigin: '50% 50%', rotate: 55 })
const TL = gsap.timeline({ repeat: -1, paused: true })
  .to(
    '.record',
    {
      rotate: 360,
      duration: 1,
      ease: 'none',
    },
    0
  )
  .to(
    '.record',
    {
      transformOrigin: '49.5% 50%',
      repeat: 1,
      yoyo: true,
      duration: 0.5,
    },
    0
  )
  .to(
    '.record__shine',
    {
      transformOrigin: '49.5% 50%',
      repeat: 1,
      yoyo: true,
      duration: 0.5,
    },
    0
  )
  .to(
    '.record__shine',
    {
      rotate: '+=4',
      repeat: 1,
      yoyo: true,
      duration: 0.5,
      ease: 'none',
    },
    0
  )


const handleMotion = ({ rotationRate: { alpha } }) => {
  const velocity = Math.round(alpha) / 10
  if (Math.abs(velocity) > 5) {
    // Not pixels per second but instead degrees per second? Rotation Rate?
    // Sooo velocity === degrees per second
    faceSwap(true)
    const speed = gsap.utils.clamp(-20, 20, velocity)
    const rate = genRate(speed)
    gsap.timeline().fromTo(
      TRACK,
      {
        currentTime:
          TRACK.currentTime < rate
            ? TRACK.duration - (rate - TRACK.currentTime)
            : TRACK.currentTime + rate,
      },
      { playbackRate: 1 },
      0
    )
    .fromTo(TL, { timeScale: speed }, { timeScale: 1 }, 0)
    if (timer) timer.kill()
    timer = gsap.delayedCall(0.2, () => faceSwap(false))
  }
}

const START = () => {
  INTRO_CONTAINER.remove()
  TRACK.play()
  TL.play()
  navigator.vibrate([1000])
  if (
    DeviceOrientationEvent?.requestPermission &&
    DeviceMotionEvent?.requestPermission
  ) {
    Promise.all([
      DeviceOrientationEvent.requestPermission(),
      DeviceMotionEvent.requestPermission(),
    ]).then((results) => {
      if (results.every((result) => result === 'granted')) {
        window.addEventListener('deviceorientation', handleOrientation)
        window.addEventListener('devicemotion', handleMotion, true)
      } else {
        console.info('You denied permission to play at the venue!')
      }
    })
  } else {
    window.addEventListener('deviceorientation', handleOrientation)
    window.addEventListener('devicemotion', handleMotion, true)
  }
}

START_BUTTON.addEventListener('click', START)
VOLUME_TOGGLE.addEventListener('click', () => {
  toggleMute()
})