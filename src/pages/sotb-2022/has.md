<!-- .slide:  data-background-color="var(--black)" data-background-video="/shared/video/family.mp4" data-background-video-loop="true" data-background-size="contain" data-background-video-muted="true" -->
---
<!-- .slide: class="title-slide" data-background-color="var(--fuschia)"  -->
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
<!-- .slide: data-background-color="var(--white)" -->
```css []
<target>:has(<condition>) { <styles> }
```
---
<!-- .slide: data-background-color="var(--selective)" -->
<div>

```css []
.everybody:has(.a-good-time) {
  animation: party-like-its 1999s forwards;
}

.jeff:has(~ .some-distant-relative) {
  animation: visit 10000s;
}
```

</div>

```html []
<!-- Selected! ✅-->
<div class="everybody">
  <div class="body body--at-state-of-the-browser">
    <div class="a-good-time"></div>
  </div>
</div>

<!-- Not Selected ❌-->
<div class="everybody"></div>

<!-- Selected! ✅-->
<div class="jeff"></div>
<div class="some-distance"></div>
<div class="some-distant-relative"></div>
```
---
<!-- .slide: class="title-slide" data-background-color="var(--fuschia)" -->
## Break the mental model <span class="flipper-wrapper"><span class="flipper">🛹</span></span>
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

<sub>There are a bunch of examples in [":has(): the family selector"](https://developer.chrome.com/blog/has-m105) over on [developer.chrome.com](https://developer.chrome.com/blog/has-m105).</sub>
---
<!-- .slide: data-background-color="var(--brand)" class="title-slide title-slide--left" -->
## Let's play with<br>form state!
---
<!-- .slide: data-background-iframe="/demos/css-has/has-forms/with-whimsy" data-background-interactive -->
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
<!-- .slide: data-background-iframe="/demos/css-has/has-dark-mode-animations" data-background-interactive -->
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
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/css-has/has-connect-4" data-background-interactive -->
---
<!-- .slide: data-background-color="var(--selective)" -->
```html [|3,4,26,27]
<div class="board__column">
  <div class="board__cell move-6" style="--row: 1;">
    <input type="checkbox" id="s-1" data-row="s-1" data-column="s-1"/>
    <input type="checkbox" id="p-1" data-row="p-1" data-column="p-1"/>
    <div class="board__disc disc">
      <div class="disc__piece">
      </div>
    </div>
  </div>
  <div class="board__cell move-5" style="--row: 2;">
    <input type="checkbox" id="s-2" data-row="s-2" data-column="s-1"/>
    <input type="checkbox" id="p-2" data-row="p-2" data-column="p-1"/>
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
        <label class="board__move" for="s-1"></label>
        <label class="board__move" for="p-1"></label>
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
<!-- .slide: class="title-slide title-slide--bottom" data-background-color="var(--fuschia)" -->
## But, really? How much wood could a woodchuck chuck if a woodchuck could chuck wood?
---
<!-- .slide: data-background-color="var(--blueberry)" -->
<div class="code-grid" style="display: grid; grid-auto-flow: column; gap: 2rem; align-items: center; justify-content: center;">

```js []
const PARTICLES = [
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

```css []
.wood ~ .chuck {
  animation: chuck 0.5s infinite; 
}

@keyframes chuck {
  50% {
    transform: rotate(-45deg);
  }
}

.wood:has(+ .chuck) {
  animation: chucked 1s forwards;
}

@keyframes chucked {
  to {
    transform: rotate(-90deg);
  }
}
```

</div>
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/css-has/has-woodchuck" data-background-interactive -->
---
<!-- End Section