 <!-- .slide: data-auto-animate -->
# <span style="opacity: 0.2;">CSS, UI, && </span><span style="opacity: 1;">DevTools</span>

---
<!-- .slide: class="table-shot" -->
<!-- Slide 1 -->
|Source | What? | How? |
|---|---|---|
| Freelance/Dribbble | Safe Cracking | DeviceOrientation, DeviceOrientation Simulator |

---
<!-- Slide 2 -->
<div class="collage-grid safe-collage">
  <img src="/shared/images/3d-knob.png" width="300">
  <img src="/shared/images/sensors.png" width="300">
  <img src="/shared/images/safe-crack.gif" width="300">
  <img src="/shared/images/kent-parallax.png" width="300">
  <img src="/shared/images/thermostat.png" width="300">
</div>
---
<!-- Slide 3 -->
<!-- .slide: class="multi-column" -->
```html[]
<label
  for="alpha"
  class="control__label"
>
  Alpha
</label>
<input
  id="alpha"
  name="alpha"
  class="control__input"
  type="range"
  min="0"
  max="100"
  step="1"
/>
```
<img src="/shared/images/petes-diagram.png" width="300" />
---
<!-- Slide 4 -->
```js[1-15|1-8|10-15|10,11|12,13|14,15]
// Given two ranges, return a function to map a value
const mapRange = (inputLower, inputUpper, outputLower, outputUpper) => {
  const INPUT_RANGE = inputUpper - inputLower
  const OUTPUT_RANGE = outputUpper - outputLower
  return value => outputLower + (
    ((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0
  )
}

// Z-axis (0deg - 360deg)
const ALPHA_MAPPER = mapRange(0, 360, 0, 100)
// X-axis (-180deg - 180deg)
const BETA_MAPPER = mapRange(-180, 180, 0, 100)
// Y-axis (-90deg - 90deg)
const GAMMA_MAPPER = mapRange(-90, 90, 0, 100)
```
---
<!-- Slide 5 -->
```js[1-11|1-3|11|5-9]
const ALPHA = document.querySelector('#alpha')
const BETA = document.querySelector('#beta')
const GAMMA = document.querySelector('#gamma')

const handleOrientation = ({ alpha, beta, gamma }) => {
  ALPHA.value = ALPHA_MAPPER(alpha)
  BETA.value = BETA_MAPPER(beta)
  GAMMA.value = GAMMA_MAPPER(gamma)
}

window.addEventListener('deviceorientation', handleOrientation)
```
---

<iframe src="/demos/device/detecting-deviceorientation/index.html"></iframe>
<!-- <iframe src="https://cdpn.io/pen/debug/mdpYOKY/de75efaa529aa7c7026cfe054ca23ada"></iframe> -->



<a class="demo-link" href="/demos/device/detecting-deviceorientation/index.html" target="_blank" rel="noreferrer noopener">
  Let's check out the demo! <span class="rocket">🚀</span>
</a>

---
<!-- Slide 7 -->
## That's it? 🍏
```js[1-15|2,15|3,10-12|4-11]
const START = () => {
  BUTTON.remove()
  if (DeviceOrientationEvent?.requestPermission) {
    DeviceOrientationEvent
      .requestPermission()
      .then(permission => {
        if (permission === 'granted')
          window.addEventListener('deviceorientation', handleOrientation)
        else
          alert('You denied permission to play!')
      })
  } else {
    window.addEventListener('deviceorientation', handleOrientation)
  }
}

BUTTON.addEventListener('click', START)
```
<sub>h/t to `@Vanaf1979` for pinging me about this one</sub>
---
<!-- Slide 8 -->
## Setting a combo
```js[1-13|1|4,13|5-11]
const GET_RANDOM = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const ALPHA_MAPPER = mapRange(0, 360, 0, 100)

const COMBINATIONS = [
  {
    id: 'alpha',
    unlock: GET_RANDOM(0, 100),
    input: ALPHA,
    label: ALPHA_LABEL,
    mapper: ALPHA_MAPPER,
  },
  ...otherCombinations
]

```
---
<!-- Slide 9 -->
## Get things rolling

```js[1-27|1-8,12|18,23]
let step = 0

const showCombination = step => {
  COMBINATIONS.forEach((combo, index) => {
    combo.input.style.display =
    combo.label.style.display = index === step ? 'block' : 'none'
  })
}

const START = () => {
  BUTTON.remove()
  showCombination(step)
  if (DeviceOrientationEvent?.requestPermission) {
    DeviceOrientationEvent
      .requestPermission()
      .then(permission => {
        if (permission === 'granted')
          window.addEventListener('deviceorientation', handleOrientation)
        else
          alert('You denied permission to play!')
      })
  } else {
    window.addEventListener('deviceorientation', handleOrientation)
  }
}

BUTTON.addEventListener('click', START)
```
---
<!-- Slide 10 -->
## Cracking Logic 👴🏼
```js[1-32|30-32|23-28|27,31|11-21|13,14|15-19|1-9]
const complete = () => {
  TITLE.innerText = 'You cracked the code!'
  TITLE.style.display = 'block'
  window.removeEventListener('deviceorientation', handleOrientation)
  COMBINATIONS.forEach(({ input }) => {
    input.removeEventListener('input', handleUpdate)
  })
}

const handleUpdate = () => {
  const { input, label, unlock } = COMBINATIONS[step]
  if (parseInt(input.value, 10) === unlock) {
    step += 1
    if (step === COMBINATIONS.length) {
      input.style.display = label.style.display = 'none'
      complete()
    } else {
      showCombination(step)
    }
  }
}

const handleOrientation = e => {
  // Set the value of the step input
  const { input, id, label, mapper, unlock } = COMBINATIONS[step]
  input.value = mapper(e[id])
  handleUpdate()
}

COMBINATIONS.forEach(({ input }) => {
  input.addEventListener('input', handleUpdate)
})
```
---
<iframe class="demo-embed" src="/demos/device/detecting-deviceorientation-no-indication/index.html"></iframe>
<!-- <iframe src="https://cdpn.io/pen/debug/mdpYOKY/de75efaa529aa7c7026cfe054ca23ada"></iframe> -->



<a class="demo-link" href="/demos/device/detecting-deviceorientation-no-indication/index.html" target="_blank" rel="noreferrer noopener">
  Let's check out the demo! <span class="lightning">✨</span>
</a>
---
<!-- Slide 12 -->
## There's no indication
<div class="stacked">

```css[1-14|1-5|7-14|14]
[type="range"] {
  --rotation: 20deg;
  --proximity-hue: calc(130 - ((130 / 100) * var(--proximity, 0)));
  accent-color:  hsl(var(--proximity-hue) 80% 50%);
  /* Animation speed will be 1 to 0.1 */
  animation: shake calc((1 - ((var(--proximity, 0) / 100) * 0.9)) * 1s) infinite;
}

@keyframes shake {
  25% {
    transform: rotate(calc((var(--proximity, 0) / 100) * var(--rotation)));
  }
  75% {
    transform: rotate(calc((var(--proximity, 0) / -100) * var(--rotation)));
  }
}
```

```js[1-10|1-2|9-10]
const PROXIMITY_THRESHOLD = 15
const PROXIMITY_MAPPER = mapRange(0, PROXIMITY_THRESHOLD, 100, 0)

// Inside the updater
const CLAMPED = Math.min(
  Math.max(0, Math.abs(input.value - unlock)),
  PROXIMITY_THRESHOLD
)
const proximity = PROXIMITY_MAPPER(CLAMPED)
input.style.setProperty('--proximity', proximity)
```

</div>
---
<iframe class="demo-embed" src="/demos/device/detecting-deviceorientation-with-indication/index.html"></iframe>




<a class="demo-link" href="/demos/device/detecting-deviceorientation-with-indication/index.html" target="_blank" rel="noreferrer noopener">
  Let's check out the demo! <span class="muscle">💪</span>
</a>
---

<!-- Slide 14 -->
## Debrief 💫

<div class="col-count" style="column-count: 2;">
  
  <div>

  ### Learned
  - DeviceOrientation Event
  - Cross Browser DeviceOrientation
  - Mapping values
  - Dynamic Animations w/ CSS Custom Properties
  
  </div>

  <div>

  ### Next
  - A11y?
  - Sounds
  - Turn it into a safe!
  - Whimsy?
  - Web Vibration API (Yep, that's a thing!)

  </div>

  <div class="practical-post-it">
  
  ### Practical Corner
  - New APIs!
  - Interesting Utilities (Map)
  - Custom Property Magic

  </div>

</div>

---

<iframe class="demo-embed demo-embed--big" src="/demos/device/deviceorientation-safe/index.html"></iframe>
<!-- <iframe src="https://cdpn.io/pen/debug/mdpYOKY/de75efaa529aa7c7026cfe054ca23ada"></iframe> -->



<a class="demo-link" href="/demos/device/deviceorientation-safe/index.html" target="_blank" rel="noreferrer noopener">
  Let's check out the demo! <span class="rocket">⭐️</span>
</a>

---
<!-- End DeviceOrientation Safe -->