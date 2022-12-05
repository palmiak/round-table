.slide: class="title-slide" data-background-color="var(--citric)"  -->
## CSS :has
---
<!-- .slide: data-background-color="var(--black)" -->
<div class="support-grid">
  <span class="browser-logo" data-browser="chrome"></span>
  <span class="browser-logo" data-browser="edge"></span>
  <span class="browser-logo" data-browser="safari"></span>
  <span class="browser-logo" data-browser="firefox"></span>
  <span class="browser-version" data-supported>105</span>
  <span class="browser-version" data-supported>105</span>
  <span class="browser-version" data-supported>15.4</span>
  <span class="browser-version">
    <span class="material-symbols-outlined">
      flag
    </span>
  </span>
</div>
---
<!-- .slide:  data-background-color="var(--fuschia)" data-background-video="/shared/video/family.mp4" data-background-video-loop="true" data-background-size="contain" data-background-video-muted="true" -->
---
<!-- .slide: data-background-color="var(--white)" -->
```css []
<target>:has(<condition>) { <styles> }
```
---
<!-- .slide: data-background-color="var(--blueberry)" -->
<div>

```css []
.everybody:has(.a-good-time) {
  animation: party-like-its 1999s forwards;
}

.jeff:has(~ .aunt) {
  animation: visit 10000s;
}
```

</div>

```html []
<!-- Selected! ✅-->
<div class="everybody">
  <div class="body body--at-web-dev-conf">
    <div class="a-good-time"></div>
  </div>
</div>

<!-- Not Selected ❌-->
<div class="everybody"></div>

<!-- Selected! ✅-->
<div class="jeff"></div>
<div class="some-distance"></div>
<div class="aunt"></div>
```
---
<!-- .slide: class="title-slide" data-background-color="var(--fuschia)" -->
## Break the mental model <span class="flipper-wrapper"><span class="flipper">🛹</span></span>
---
<!-- .slide: data-background-color="var(--selective)" -->
<div class="code-split">

<div class="code-stack">


```html
<div class="🐱"></div>
```

```css
.🐱:before {
  --content: "😿";
}
```
</div>

<iframe class="demo-embed" src="/demos/css-has/has-primer/has-no"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--cinnabar)" -->
<div class="code-split">

<div class="code-stack">


```html
<div class="🐱"></div>
<div></div>
<div class="🍔"></div>
```

```css
.🐱:has(~ .🍔):before {
  --content: "😾";
}
```
</div>

<iframe class="demo-embed" src="/demos/css-has/has-primer/has-distant"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--chateau)" -->
<div class="code-split">

<div class="code-stack">


```html
<div class="🐱"></div>
<div class="🍔"></div>
```

```css
.🐱:has(+ .🍔):before {
  --content: "🙀";
  animation: anticipate 0.1s infinite;
}

@keyframes anticipate {
  50% {
    transform: translate(0, -5%);
  }
}
```
</div>

<iframe class="demo-embed" src="/demos/css-has/has-primer/has-sibling"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--chateau)" -->

<div style="display: inline-flex; gap: 1rem; align-items: center;">

```html
<div class="🐱">
  <div class="🍔"></div>
</div>
```

```css
.🐱:has(.🍔):before {
  --content: "😻";
  transform-origin: 50% 75%;
  animation:
    satisfied steps(1, end) 2s both,
    gobble 0.2s 10 linear both,
    full 6s 2s infinite linear;
}
```

</div>

---
<!-- .slide: data-background-color="var(--blueberry)" data-background-iframe="/demos/css-has/has-primer/has-it" -->
---
<!-- .slide: data-background-color="var(--chateau)" data-background-iframe="/demos/css-has/has-cards/explore-feature" data-background-interactive -->
---
<!-- .slide: data-background-color="var(--citric)" -->
```css
.card {
  box-shadow: var(--shadow-elevation-low);
}
.card:has(.card__feature) {
  box-shadow: var(--shadow-elevation-high);
}
.card:not(:has(.card__blurb)):not(:has(.card__author)) {
  aspect-ratio: 3 / 4;
}
.card:not(:has(.card__blurb)):not(:has(.card__author)) .card__image {
  height: 100%;
}
@media (prefers-reduced-motion: no-preference) {
  .card:has(.card__feature) {
    animation: wiggle 6s infinite;
  }
}
```
---
<!-- .slide: data-background-color="var(--grey)" data-background-iframe="/demos/css-has/has-cards/explore-feature-not" data-background-interactive -->
---
<!-- .slide: data-background-color="var(--selective)" -->
## use cases for days

```css []
/* Change the grid layout based on content */
.card:has(.card__image) { grid-template-columns: 100px 1fr; }
/* Full width card when containing feature */
.card:has(.card__feature) { grid-column: 1 / -1; }
/* Non icon links */
a:not(:has(> svg)) { ... }
/* Update the :root based on some state change */
:root:has([aria-pressed=true]) { … }
/* Select the .container that has an odd number of children */
.container:has(> .container__item:last-of-type:nth-of-type(odd)) { ... }
/* Custom elements are supported too */
main:has(todo-list) { ... }
```

<sub>There are a bunch of examples in ":has(): the family selector" over on [developer.chrome.com](https://developer.chrome.com/blog/has-m105).</sub>
---
<!-- .slide: data-background-color="var(--spearmint)" -->
<!-- ## Forms
--- -->
```html []
<div class="form-group">
  <label for="email" class="form-group__label">Email</label>
  <input
    required
    type="email"
    id="email"
    class="form-input"
    title="Enter valid email address"
    placeholder="Enter valid email address"
  />
</div>
```
---
<!-- .slide: data-background-iframe="/demos/css-has/has-forms/no-style" data-background-interactive data-background-color="var(--black)" -->
---
<!-- .slide: style="--code-size: 0.4em" data-background-color="var(--spearmint)"-->
```css []
label {
  color: var(--color);
}

input {
  border: 4px solid var(--color);
}

input:focus-visible {
  outline-color: var(--color);
}

input::placeholder {
  color: transparent;
}

/* Cascade in effect */
.form-group:has(:invalid) {
  --color: var(--invalid);
}
/* :focus-within also valid */
.form-group:has(:focus) {
  --color: var(--focus);
}

.form-group:has(:valid) {
  --color: var(--valid);
}
```
---
<!-- .slide: data-background-color="var(--black)" data-background-iframe="/demos/css-has/has-forms/color-indication" data-background-interactive -->
---
<!-- slide: data-background-iframe="/demos/css-has/has-forms/with-error" data-background-interactive -->
<!-- --- -->
<!-- ```html [11]
<div class="form-group">
  <label for="email" class="form-group__label">Email</label>
  <input
    required
    type="email"
    id="email"
    class="form-input"
    title="Enter valid email address"
    placeholder="Enter valid email address"
  />
  <div class="form-group__error">Enter a valid email address</div>
</div>
```
```css []
.form-group:has(:invalid:not(:focus):not(:placeholder-shown))
.form-group__error {
  display: block;
}
```
--- -->
<!-- .slide: data-background-color="var(--citric)" -->
<div>

```html []
<label for="email" class="form-group__label">
  <span data-splitting="" aria-hidden="true">
    <span class="char" data-char="E" style="--char-index:0;">E</span>
    <span class="char" data-char="m" style="--char-index:1;">m</span>
    <span class="char" data-char="a" style="--char-index:2;">a</span>
    <span class="char" data-char="i" style="--char-index:3;">i</span>
    <span class="char" data-char="l" style="--char-index:4;">l</span>
  </span>
  <span class="sr-only">Email</span>
</label>
```

</div>

```css []
@media (prefers-reduced-motion: no-preference) {
  .form-group:has(:valid) label span {
    display: inline-block;
    animation: jump 0.25s calc(var(--char-index) * 0.05s);
  }
  @keyframes jump {
    50% {
      transform: translateY(-50%);
    }
  }
}
/* Show an error message? */
.form-group:has(:invalid:not(:focus):not(:placeholder-shown))
.form-group__error {
  display: block;
}
```
---
<!-- .slide: data-background-color="var(--black)" data-background-iframe="/demos/css-has/has-forms/with-whimsy" data-background-interactive -->
---
<!-- .slide: data-background-color="var(--cinnabar)" -->
```css []
:root {
  --dark-mode: 0;
  --text-1: var(--gray-9);
  --text-2: var(--gray-8);
}
/* Don't do it with a checkbox 🙏 */
:root:has(.theme-toggle[aria-pressed=true]) {
  --dark-mode: 1;
  --text-1: var(--gray-0);
  --text-2: var(--gray-1);
}
body {
  color: var(--text-2);
}
h1 {
  color: var(--text-1);
}
```
---
<!-- .slide: data-background-iframe="/demos/css-has/has-dark-mode" data-background-interactive -->
---
<!-- ## Interaction
--- -->
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/css-has/has-interaction/has-hover" data-background-interactive -->
---
<!-- .slide: data-background-color="var(--blueberry)" -->
```css []
li:hover {
  background: var(--pink-6);
}

li:hover + li,
/* Previous sibling! */
li:has(+ li:hover) {
  background: var(--pink-3);
}
```
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/css-has/has-interaction/has-previous" data-background-interactive -->
---
<!-- slide: data-background-iframe="/demos/css-has/has-interaction/has-lerp" data-background-interactive
--- -->
<!-- .slide: data-background-color="var(--selective)" -->
```css []
:root {
  --lerp-0: 1;
  --lerp-1: 0.5625;
  --lerp-2: 0.25;
  --lerp-3: 0.0625;
  --lerp-4: 0;
}
.blocks {
  display: flex;
}
.block {
  transition: flex 0.2s;
  flex: calc(0.2 + (var(--lerp, 0) * 1.5));
}
:is(.block:hover, .block:focus-visible) {
  --lerp: var(--lerp-0);
  z-index: 5;
}
.block:has( + :is(.block:hover, .block:focus-visible)),
:is(.block:hover, .block:focus-visible) + .block {
  --lerp: var(--lerp-1);
  z-index: 4;
}
.block:has( + .block + :is(.block:hover, .block:focus-visible)),
:is(.block:hover, .block:focus-visible) + .block + .block {
  --lerp: var(--lerp-2);
  z-index: 3;
}
```
---
<!-- .slide: data-background-iframe="/demos/css-has/has-interaction/has-dock" data-background-interactive -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/css-has/has-calendar" data-background-interactive -->
---
<!-- .slide: data-background-color="var(--chateau)" -->
```html []
<table>
  <tr>
    <td class="calendar__cell">
      <span class="calendar__number">30</span>
      <input type="radio" class="sr-only" name="from" id="from-09-30" />
      <input type="radio" class="sr-only" name="to" id="to-09-30" />
      <label for="from-09-30">from 09-30</label>
      <label for="to-09-30">to 09-30</label>
    </td>
    <td class="calendar__cell">
      <span class="calendar__number">1</span>
      <input type="radio" class="sr-only" name="from" id="from-10-01" />
      <input type="radio" class="sr-only" name="to" id="to-10-01" />
      <label for="from-10-01">from 10-01</label>
      <label for="to-10-01">to 10-01</label>
    </td>
  </tr>
</table>
```
---
<!-- .slide: data-background-color="var(--fuschia)" -->
```css []
.calendar__cell:has(:checked) {
  --background: var(--primary);
  --alpha: 1;
  --color: var(--light);
}

.calendar:has([id*=from]:checked):not(:has([id*=to]:checked)):has(.calendar__cell:hover)
tr:has(:checked) ~ tr:has(:hover)
.calendar__cell:has(~ .calendar__cell:hover) {
  --background: var(--potential);
  --alpha: 1;
}

.calendar:has([id*=from]:checked):has([id*=to]:checked)
tr:has([id*=from]:checked):has(~ tr .calendar__cell > :checked)
.calendar__cell:has([id*=from]:checked) ~ .calendar__cell:not(:hover) {
  --background: var(--in-range);
  --alpha: 1;
  --color: var(--light);
}
```
---
<!-- ## Games
--- -->
<!-- .slide: data-background-color="#060d13" data-background-iframe="/demos/css-has/has-tic-tac-toe" data-background-interactive -->
---
<!-- .slide: data-background-color="var(--blueberry)" -->
```html []
<form class="game">
  <div class="board">
    <!-- Obfuscated markup -->
    <input class="x-check" type="checkbox" id="x-8"/>
    <input class="o-check" type="checkbox" id="o-8"/>
    <div class="board__cell">
      <label for="x-0">
        <svg class="x ghost"></svg>
      </label>
      <label for="o-0">
        <svg class="o ghost"></svg>
      </label>
      <svg class="x board__x"></svg>
      <svg class="o board__o"></svg>
    </div>
  </div>
</form>
```
---
<!-- .slide: data-background-color="var(--selective)" -->
```css []
[for*="x"] {
  z-index: calc(1 + var(--turn));
}
/* Counters don't work with calc... yet */
.board:has(:checked),
.board:has(:checked ~ :checked ~ :checked) {
  --turn: 1;
}
.board:has(:checked ~ :checked),
.board:has(:checked ~ :checked ~ :checked ~ :checked) {
  --turn: 0;
}
:root:has(#x-0:checked ~ #x-1:checked ~ #x-2:checked),
:root:has(#x-3:checked ~ #x-4:checked ~ #x-5:checked) {
  --show-cross: 1;
  --show-draw: 0;
}
:root:has(#o-0:checked ~ #o-1:checked ~ #o-2:checked),
:root:has(#o-3:checked ~ #o-4:checked ~ #o-5:checked) {
  --show-naught: 1;
  --show-draw: 0;
}
```
---
<!-- .slide: data-background-color="var(--chateau)" -->
```html [4,5]
<form class="game">
  <div class="board">
    <!-- Obfuscated markup -->
    <input class="x-check" type="checkbox" id="x-8"/>
    <input class="o-check" type="checkbox" id="o-8"/>
    <div class="board__cell">
      <label for="x-0">
        <svg class="x ghost"></svg>
      </label>
      <label for="o-0">
        <svg class="o ghost"></svg>
      </label>
      <svg class="x board__x"></svg>
      <svg class="o board__o"></svg>
    </div>
  </div>
</form>
```
---
<!-- .slide: data-background-color="var(--cinnabar)" -->
```css []
/* You can :has a :has */
:root:has(#x-0:checked):has(#x-1:checked):has(#x-2:checked),
:root:has(#x-3:checked):has(#x-4:checked):has(#x-5:checked) {
  --show-cross: 1;
  --show-draw: 0;
}
/* But you can't :has a :has */
.board:has(.board__cell:has(:checked):has(+ .board__cell:has(:checked))) {
  --turn: 0;
}
```
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/css-has/has-connect-4" data-background-interactive -->
---
<!-- .slide: data-background-color="var(--selective)" -->
```html [|3,4,18,19]
<div class="board__column">
  <div class="board__cell move-6" style="--row: 1;">
    <input type="checkbox" id="s-6" data-row="s-1" data-column="s-1"/>
    <input type="checkbox" id="p-6" data-row="p-1" data-column="p-1"/>
    <div class="board__disc disc">
      <div class="disc__piece">
      </div>
    </div>
  </div>
  <!-- Other cells -->
</div>
<div class="board__labels move-6" data-for="move-6" style="--row: 1;">
  <div class="cuboid">
    <div class="cuboid__side"></div>
    <div class="cuboid__side"></div>
    <div class="cuboid__side">
      <div class="move-controls">
        <label class="board__move" for="s-6"></label>
        <label class="board__move" for="p-6"></label>
      </div>
    </div>
  </div>
</div>
```
---
<!-- .slide: data-background-color="var(--cinnabar)" -->
```css []
/* Horizontal */
.board__column:has([data-row=p-1]:checked) +
.board__column:has([data-row=p-1]:checked) +
.board__column:has([data-row=p-1]:checked) +
.board__column:has([data-row=p-1]:checked) ~ .win,
/* Diagonal */
.board__column:has([data-row=p-1]:checked) +
.board__column:has([data-row=p-2]:checked) +
.board__column:has([data-row=p-3]:checked) +
.board__column:has([data-row=p-4]:checked) ~ .win {
  display: block;
  --winner: var(--primary);
  --show-win: 1;
}
```
---
<!-- .slide: data-background-color="var(--blueberry)" -->
```css []
/* The "Magic" bullet for turn switching */
/* Creates a width to reveal the other label */
.board__labels .move-controls:after {
  content: counter(turn, lower-roman);
  font-size: 1px;
  letter-spacing: var(--cell-size);
  color: transparent;
}

.board__move[for*="s"] {
  left: 0;
}

.board__move[for*="p"] {
  right: 0;
}

body {
  counter-reset: turn 1;
}

[id*="p"]:checked {
  counter-increment: turn 2;
}

[id*="s"]:checked {
  counter-increment: turn -2;
}
```

<sub>h/t Bence Szabó for this one 🙏</sub>
---
<!-- .slide: data-background-color="var(--selective)" -->

```css
:root {
  --mine-count: 8;
}
:root:has([id*="bomb"]:checked) {
  --show-fail: 1;
}
body {
  counter-reset: flag var(--mine-count);
}
[id*=flag--]:checked {
  counter-increment: flag -1;
}
.mine-count:after {
  content: counter(flag);
}
```
---
<!-- .slide: data-background-iframe="/demos/css-has/has-minesweeper" data-background-interactive -->
---
<!-- .slide: class="title-slide title-slide--bottom" data-background-color="var(--fuschia)" -->
## But, really? How much wood could a woodchuck chuck if a woodchuck could chuck wood?
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/css-has/has-woodchuck" data-background-interactive -->
---
<!-- .slide: data-background-color="var(--spearmint)" -->
```js []
const PARTICLES = [
  {
    trigger: 'cat',
    emoji: '😹'
  },
  {
    trigger: 'lit',
    emoji: '🔥'
  },
  {
    trigger: 'boom',
    emoji: '💣'
  },
  {
    trigger: 'wood',
    emoji: '🌴',
  },
  {
    trigger: 'chuck',
    emoji: '🪓'
  }  
]
```
---
<!-- ```js []
const EMOJIS = document.querySelector('.emojis')
const PROCESS_AUDIO = e => {
  const TRANSCRIPT = e.results[e.results.length - 1][0].transcript
    .toLowerCase()
    .trim()
  if (e.results[e.results.length - 1].isFinal === true) {
    for (const WORD of TRANSCRIPT.split(' ')) {
      const PARTICLE = PARTICLES.filter(p => {
        return WORD.indexOf(p.trigger) !== -1
      })[0]
      if (PARTICLE) {
        const P = document.createElement('div')
        P.innerText = PARTICLE.emoji
        P.className = PARTICLE.trigger
        EMOJIS.appendChild(P)
        if (PARTICLE.trigger === 'wood' || PARTICLE.trigger === 'chuck') {
          P.addEventListener('animationend', () => {
            P.remove()
          })
        }
        if (PARTICLE.trigger === 'boom') {
          setTimeout(() => EMOJIS.innerHTML = '', 2000)
        }
        P.style.setProperty('--index', EMOJIS.children.length)
      }
    }
  }
  document.querySelector('main').innerText = TRANSCRIPT
}

```
--- -->
<!-- .slide: data-background-color="var(--blueberry)" -->
```css []
.wood:has(+ .chuck) {
  animation: chucked 1s forwards;
}

:is(.wood, .chuck):has(+ .lit) {
  animation: burned 0.25s forwards;
}

:is(.cat):has(+ .lit):after,
.lit + .cat:after {
  content: "🙀";
  position: absolute;
  inset: 0;
}

@keyframes burned {
  to {
    filter: brightness(0);
  }
}

@keyframes chucked {
  to {
    transform: rotate(-90deg);
  }
}
```
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/css-has/has-woodchuck" data-background-interactive -->
---
<!-- End Section -->