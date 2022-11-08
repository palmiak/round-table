<!-- .slide: data-auto-animate -->
# <span style="opacity: 0.2;">CSS, </span><span style="opacity: 1;">UI<span style="opacity: 0.2;">, && DevTools</span>

---
<!-- .slide: class="table-shot" -->
<!-- Slide 1 -->

|Source | What? | How? |
|---|---|---|
| TikTok | Sliding Puzzle Captcha | HTML Drag and Drop, CSS Grid, Custom Properties |

---

<div class="collage-grid capy-collage">
  <img src="/shared/images/capy-puzzle.png" width="300">
  <img src="/shared/images/drag-and-drop.png" width="300">
  <img src="/shared/images/homer-puzzle.gif" width="300">
  <img src="/shared/images/grid-inspector.png" width="300">
  <img src="/shared/images/capy-range.png" width="300">
</div>

---
<!-- Slide 2 -->
```html[1-100]
<!--  The main element -->
<div class="captcha">
  <!-- An element for layout -->
  <div class="captcha__grid">
    <!-- An element for displaying the image -->
    <div class="captcha__img"></div>
    <!-- Pieces && Slots would be added here? -->
  </div>
</div>
```
---
<!-- Slide 3 -->
```javascript[1-100|1,10|2-7|11,12]
class Captcha {
  static defaults = {
    gridSize: 5,
    image: 'https://source.unsplash.com/random/720x720?moon',
    pieces: 4,
    onComplete: () => alert('You are not a robot?')
  }

  constructor(options) {...}
}
const element = document.querySelector('.captcha')
new Captcha({ element, gridSize: 4, pieces: 2 })
```
---
<!-- Slide 4 -->
```javascript[1-100|2|12-13|14-15]
constructor(options) {
  const opts = (this._options = { ...Captcha.defaults, ...options })
  this._element = opts.element
  this._progress = 0
  this._grid = opts.element.querySelector('.captcha__grid')
  this._img = opts.element.querySelector('.captcha__img')
  if (!this._element || !this._img || !this._grid)
    throw Error('Captcha: Required elements missing!')
  if (opts.pieces > Math.pow(opts.gridSize, 2))
    throw Error('Captcha: Can not have more pieces than available')
  // Set CSS inline custom properties
  this._element.style.setProperty('--captcha-image', `url(${opts.image})`)
  this._element.style.setProperty('--captcha-grid-size', opts.gridSize)
  // Now set up the moveable pieces
  this.setup()
}
```
---
<!-- Slide 5 -->
<!-- .slide: class="multi-column" style="--split-one: 1fr; --split-two: 1fr;" -->
```js[1-100|2|4,6,11|7-10|14]
generatePieces() {
  const pieces = []
  const generatePiece = () => {...}
  while (pieces.length !== this._options.pieces) {
    const pushPiece = () => {
      const newPiece = generatePiece()
      // Don't want duplicates
      const alreadyExists = pieces.filter(...).length
      if (alreadyExists) pushPiece()
      else pieces.push(newPiece)
    }
    pushPiece()
  }
  this._pieces = pieces
}
```
<img src="/shared/images/grid-inspection.png" width="300" />
---
<!-- Slide 6 -->
<!-- .slide: class="multi-column" style="--split-one: 1fr; --split-two: 1fr;" -->

<img src="/shared/images/dotted-inspection.png" width="300" />


```js[1-29|2-13|14-17|18-22|23-28]
const generatePiece = () => {
  // Create an Array of two items
  // One is 1 || -2 [CSS Grid]
  // The other is the gap
  // Flip a coin to reverse and return the Array.
  const positions = [
    // This can either be the start or the finish
    Math.random() > 0.5 ? -2 : 1,
    // This can be 3, 4, 5, or 6. Gutter is 2
    Math.floor(
      Math.random() * (this._options.gridSize - 1)
    ) + 3,
  ]
  // Which cell is it?
  const slot = Math.floor(
    Math.random() * Math.pow(this._options.gridSize, 2)
  )
  // What are the coordinates?
  const slotPositions = [
    slot % this._options.gridSize,
    Math.floor(slot / this._options.gridSize),
  ]
  return {
    // Flip positions?
    positions: Math.random() > 0.5 ?
      positions.reverse() : positions,
    slots: slotPositions,
  }
}
```
---
<!-- .slide: class="multi-column" style="--split-one: 1fr; --split-two: 1fr;" -->
<!-- Slide 7 -->
```js[1-25|2-5|6-11|12-20|21-23]
createPieces() {
  for (const {
    positions: [px, py],
    segments: [sx, sy],
  } of this._pieces) {
    const piece = document.createElement('div')
    piece.className = 'captcha__piece'
    // Position the piece and make it draggable
    piece.setAttribute('draggable', true)
    piece.style.setProperty('--captcha-x', px)
    piece.style.setProperty('--captcha-y', py)
    const slot = document.createElement('div')
    slot.className = 'captcha__slot'
    // Account for the gutter
    slot.style.setProperty('--slot-x', sx + 3)
    slot.style.setProperty('--slot-y', sy + 3)
    // Needs to be able to show the correct image
    // Negate for background-position
    piece.style.setProperty('--slot-x', -sx)
    piece.style.setProperty('--slot-y', -sy)
    // Throw in the grid
    this._grid.appendChild(piece)
    this._grid.appendChild(slot)
  }
}
```
<img src="/shared/images/dotted-grid-tool.png" width="300" />
---
<!-- Slide 8 -->
```css[1-13|15-21|23-31]
:root {
  --size: 50vmin;
}

.captcha {
  /* "4" is "2*" the gutter which is "2" */
  --grid-size: calc(var(--captcha-grid-size) + 4);
  --cell-size: calc(var(--size) / var(--grid-size));
  --image-size: calc(var(--cell-size) * var(--captcha-grid-size));
  height: var(--size);
  aspect-ratio: 1 / 1;
  position: relative;
}

.captcha__grid {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(var(--grid-size), 1fr);
  grid-template-rows: repeat(var(--grid-size), 1fr);
}

.captcha__img {
  position: relative;
  object-fit: cover;
  background-color: hsl(0 0% 75%);
  background-image: var(--captcha-image);
  background-size: var(--image-size);
  grid-row:  3 / -3;
  grid-column: 3 / -3;
}
```
---
<!-- Slide 9 -->
<img src="/shared/images/moon-grid.png" width="300" />
---
<!-- Slide 10 -->
```css[1-16|7,8,13,14|2,3,4,5,6]
.captcha__piece {
  background-image: var(--captcha-image);
  background-size: var(--image-size);
  background-position: calc(
    var(--segment-x) * var(--cell-size)) calc(var(--segment-y) * var(--cell-size)
  );
  grid-column: var(--captcha-x);
  grid-row: var(--captcha-y);
  z-index:  2;
}
.captcha__slot {
  background: blue;
  grid-column: var(--segment-x);
  grid-row: var(--segment-y);
  z-index:  2;
}
```
---
<!-- Slide 11 -->
<!-- .slide: data-background-iframe="/demos/draggable/draggable-captcha-step-one/index.html" data-background-interactive -->
---
<!-- Slide 12 -->
```js[]
piece.addEventListener('dragstart',handleDragStart({ piece, px, py, sx, sy }))
piece.addEventListener('dragend', handleDragEnd(piece))
slot.addEventListener('drop', handleDrop({ piece, slot, px, py, sx, sy }))
slot.addEventListener('dragover', doNothing)
```
<sub>The business end 💼</sub>
---
```js[1-10|2,3|4|5|8-10]
const handleDragStart =
  ({ piece, px, py, sx, sy }) =>
  (e) => {
    piece.style.opacity = 0.25
    e.dataTransfer.setData('text/json', JSON.stringify({ px, py, sx, sy }))
  }

const handleDragEnd = piece => () => {
  piece.style.opacity = 1
}
```
---
<!-- Slide 13 -->
<!-- .slide: data-background-iframe="/demos/draggable/draggable-captcha-step-two/index.html" data-background-interactive -->
---
<!-- Slide 14 -->
## The Drop
```js[1-22|4-10|11-13|14|15-18|19-20]
const handleDrop =
  ({ piece, slot, px, py, sx, sy }) =>
  (e) => {
    const transferred = JSON.parse(e.dataTransfer.getData('text/json'))
    if (
      transferred.sx === sx &&
      transferred.sy === sy &&
      transferred.px === px &&
      transferred.py === py
    ) {
      // It's a match!
      piece.remove()
      slot.remove()
      this._progress++
      this._element.style.setProperty(
        '--progress',
        (this._progress / this._options.pieces) * 100
      )
      if (this._progress === this._options.pieces && this._options.onComplete)
        this._options.onComplete() 
    }
  }
```
---
<!-- .slide: data-background-iframe="/demos/draggable/draggable-captcha-step-three/index.html" data-background-interactive -->
---
## Remember this?
```css[1-18|1-5|7,18,9,10|7,18,11-15,16]
@property --progress {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
} 

.captcha__img:before {
  content: "";
  position: absolute;
  inset: -1vmin;
  background: conic-gradient(
    from 315deg,
    hsl(130 80% 50%) calc(var(--progress) * 1%),
    transparent calc(var(--progress) * 1%)
  );
  transition: --progress 0.5s;
  z-index: -1;
}
```
---
<!-- .slide: data-background-iframe="/demos/draggable/draggable-captcha-step-four/index.html" data-background-interactive -->
---
<!-- Slide 13 -->
## Debrief 💫

<div class="col-count" style="column-count: 2;">
  
  <div>

  ### Learned
  - Math
  - Reusable Classes
  - CSS Grid
  - HTML Drag and Drop
  - Applied @property
  - CSS Custom Properties

  </div>
  
  <div>
  
  ### Next
  - A11y?
  - Sounds
  - FLIP
  - Whimsy?
  - Masking/Clipping Shapes

  </div>

  <div class="practical-post-it">
  
  ### Practical Corner
  - Create components
  - Layout with CSS Grid
  - Drag and Drop interactions (Reordering, etc.)

  </div>

</div>
---
<!-- Slide 14 -->
<!-- .slide: data-background-iframe="/demos/draggable/draggable-captcha/index.html" data-background-interactive data-background-color="hsl(210 80% 99%)"-->
---
<!-- End UI Slides -->