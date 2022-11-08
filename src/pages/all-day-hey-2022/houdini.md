<!-- .slide: data-auto-animate -->
# <span>CSS</span><span>, UI, && DevTools</span>

---
<!-- .slide: data-auto-animate -->
# <span>CSS</span><span style="opacity: 0.2;">, UI, && DevTools</span>

---
<!-- .slide: class="table-shot" -->
<!-- Try and limit each demo to 10 slides. That's a minute a slideish. -->
<!-- Slide 1 -->

|Source | What? | How? |
|---|---|---|
| Socials/Gym | Houdini @property exploration. | Explore! |


<sub>I have a soft spot for this one...</sub>

---

<!-- Slide 2 -->

<div class="collage-grid">
  <img src="/shared/images/houdini-smarts.png" width="300">
  <img src="/shared/images/caniuse-houdini.png" width="300">
  <img src="/shared/images/magic.gif" width="300">
  <img src="/shared/images/is-houdini-ready-yet.png" width="300">
  <img src="/shared/images/houdini-superpower.png" width="300">
</div>
---
<!-- .slide: class="shrink-code" -->

```css [1-8|10-19|11,17-18]
:root {
  --my-untyped-color: red;
}

.untyped {
  --my-untyped-color: url('bear.png');
  background: var(--my-untyped-color);
}

@property --my-color {
  syntax: '<color>';
  initial-value: red;
  inherits: false;
}

.typed {
  --my-color: url('bear.png');
  background: var(--my-color);
}

```
---
<!-- .slide: class="multi-column"-->
<!-- Slide 3 -->
```css [1-8|10-19]
:root {
  --my-untyped-color: red;
}

.untyped {
  --my-untyped-color: url('bear.png');
  background: var(--my-untyped-color);
}

@property --my-color {
  syntax: '<color>';
  initial-value: red;
  inherits: false;
}

.typed {
  --my-color: url('bear.png');
  background: var(--my-color);
}

```

<iframe class="demo-embed" src="/demos/houdini/typestyle/index.html" ></iframe>

---
<!-- .slide: data-auto-animate -->
<!-- Slide 4 -->
## Type~~Script~~Style 👀

---
<!-- .slide: data-auto-animate -->

## Type~~Script~~Style 👀
Context ➡️ Interpolation ➡️ Motion

---
<!-- .slide: data-auto-animate -->

## Type~~Script~~Style 👀
Context ➡️ Interpolation ➡️ Motion
### Less Tricks! 🤔

---
<!-- .slide: class="multi-column" data-auto-animate -->
<!-- Slide 5 -->
```css[7-10|12-16|18-22|24-28|1-5,24-28]
@property --hue {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

.box {
  background: hsl(var(--hue), 100%, 50%);
  animation: hue-rotate 5s infinite linear;
}

@keyframes hue-rotate {
  to {
    background: hsl(360, 100%, 50%);
  }
}

@keyframes hue-rotate {
  to {
    filter: hue-rotate(360deg);
  }
}

@keyframes hue-rotate {
  to {
    --hue: 360;
  }
}

```

<iframe class="demo-embed" src="/demos/houdini/typeanimation/index.html" ></iframe>

---
<!-- .slide: data-class="wow-slide" data-background-iframe="/demos/houdini/wow/index.html" data-background-color="#e6b319" -->
<!-- Slide 6 -->
```css [1-100]
h1 {
  --color: hsl(var(--hue), 80%, 60%);
  color: var(--color);
  animation-name: party
  animation-delay: calc(var(--index) * -0.1s);
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes party {
  100% {
    --hue: 360;
  }
}

```

---
<!-- .slide: class="multi-column" -->
<!-- Slide 7 -->

```css[]
@property --wave {
  inherits: false;
  initial-value: 0%;
  syntax: '<percentage>';
}
body {
  --half-wave: calc(var(--wave) * 0.5);
  background: linear-gradient(
    transparent 0 calc(35% + var(--half-wave)),
    var(--wave-four) calc(75% + var(--wave)) 100%
  ), var(--sand);
  animation: waves 5s infinite ease-in-out;
}
@keyframes waves {
  50% {
    --wave: 25%;
  }
}
```
<iframe class="demo-embed" src="/demos/houdini/waves/index.html" ></iframe>
---

<!-- .slide: class="multi-column" style="--split-one: 0.5fr; --split-two: 0.5fr;" -->

```css[1-18,28-42]
@property --nose {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}
@property --tail {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}
.loader {
  mask: conic-gradient(
    from 45deg,
    transparent 0 var(--tail),
    #000 0 var(--nose),
    transparent 0 var(--nose)
  );
  animation: load 2.5s both infinite ease-in-out,
          spin 3.25s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes load {
  0% {
    --tail: 0%;
    --nose: 0%;
  }
  40%,
  60% {
    --nose: 100%;
    --tail: 0%;
  }
  100% {
    --nose: 100%;
    --tail: 100%;
  }
}
```

<iframe class="demo-embed" src="/demos/houdini/that-loader/index.html" ></iframe>

---
<!-- .slide: class="multi-column" -->

```css[]

.car {
  animation: journey 5s infinite linear;
  transform: translate(
          calc(var(--x) * 1vmin),
          calc(var(--y) * 1vmin)
        )
        rotate(var(--r));
}
@keyframes journey {
  0% {
    --x: -22.5;
    --y: 0;
    --r: 0deg;
  }
  10% {
    --r: 0deg;
  }
  12.5% {
    --x: -22.5;
    --y: -22.5;
  }
  15% {
    --r: 90deg;
  }
  25% {
    --x: 0;
    --y: -22.5;
  }
  /* Obfuscated keyframes */
}

```

<iframe class="demo-embed" src="/demos/houdini/track-race/index.html" ></iframe> 

---
<!-- .slide: class="multi-column" -->


```css[]
.button[aria-pressed="true"] {
  --accessory-translation: 30%;
  --main-rotation: -45deg;
  --final-translation: -55%;
}
.button[aria-pressed="true"] .icon span:nth-of-type(odd) {
  transition: --hover-translation var(--transition),
  --accessory-translation var(--transition),
  --main-rotation var(--transition) calc(var(--transition) * 2),
  --final-translation var(--transition) calc(var(--transition) * 3);
}
.button[aria-pressed="true"] .icon span:nth-of-type(2) {
  transition: --main-rotation var(--transition) var(--transition);
}
.icon > span:nth-of-type(odd) {
  width: 60%;
  transform: translate(calc(var(--hover-translation) * var(--coefficient)))
    translate(calc(var(--accessory-translation) * var(--coefficient)), 0)
    rotate(calc(var(--main-rotation) * -1))
    translate(calc(var(--final-translation) * var(--coefficient)));
}
```
<iframe class="demo-embed" src="/demos/houdini/transition-toggle/index.html" ></iframe> 

---
<!-- Slide 8 -->
<div class="multi-column">
  
```css[]
[data-char]:after {
  --txt: attr(data-char);
  animation: glitch 0.2s 0.5s steps(1) infinite;
  content: var(--txt);
  color: var(--color);
  position: absolute;
  left: 0;
  top: 0;
}

@keyframes glitch-switch {
  0% {
    content: var(--char-0);
  }
  10% {
    content: var(--char-1);
  }
  20% {
    content: var(--char-2);
  }
  30% {
    content: var(--char-3);
  }
  /* Obfuscated keyframes */
}
```

<iframe class="demo-embed" src="/demos/houdini/glitchy-text/index.html" ></iframe>

</div>

---

<!-- .slide: class="multi-column" -->

```css[]
@property --count {
  inherits: false;
  initial-value: 0;
  syntax: '<integer>';
}

.counter {
  counter-reset: count var(--count);
  animation: count 1s steps(100) infinite;
}

.counter:nth-of-type(2) {
  animation-duration: 5s;
}

.counter:after {
  font-variant: tabular-nums;
  content: counter(ms);
}

@keyframes count {
  to {
    --count: 100;
  }
}
```

<iframe class="demo-embed" src="/demos/houdini/animating-numbers/index.html" ></iframe>

<sub>Note the `tabular-nums` usage</sub>

---
<!-- Slide 9 -->
<!-- .slide: class="multi-column" -->

```css[1-5|33-39|23-31|7-21|1-39]
@property --ms-tens {
  initial-value: 0;
  inherits: false;
  syntax: '<integer>';
}

#start:checked ~ .stopwatch__face .digit,
#pause:checked ~ .stopwatch__face .digit {
  animation: var(--name, none)
      var(--duration, 1s)
      infinite
      steps(var(--steps))
      var(--state);
}

#start:checked ~ .stopwatch__face {
  --state: running;
}
#pause:checked ~ .stopwatch__face {
  --state: paused;
}

.digit {
  color: transparent;
  counter-reset: var(--counter-name) var(--counter-variable);
}
.digit:after {
  content: counter(var(--counter-name));
  color: white;
  font-variant: tabular-nums;
}

.ms--tens {
  --duration: 1s;
  --steps: 10;
  --counter-name: ms-tens;
  --counter-variable: var(--ms-tens);
  --name: ms-tens;
}
```

<iframe class="demo-embed" src="/demos/houdini/bland-stopwatch/index.html"></iframe>

<div style="grid-column: span 2; margin-top: 1em;"><sub>No drift! 🏎</sub></div>
---

## Debrief 💫

<div class="col-count" style="column-count: 2;">
  <div>
  
  ### Learned
  - Houdini Properties and Values API
  - Semantic HTML tricks
  - Drawbacks of JavaScript timers
  
  </div>
  
  <div>

  ### Next
  - Make it pretty?
  - 3D 🤯
  - More interaction
  - Pure CSS all the way?
  - Wrote an article [CSS Tricks]

  </div>

  <div class="practical-post-it">
  
  ### Practical Corner
  - Awesome use cases
  - Less tricks!
  - Type checking

  </div>

</div>

---

<!-- .slide: data-background-color="#ead9f2" data-background-iframe="/demos/houdini/css-stopwatch/index.html" data-background-interactive -->

---
<!-- End CSS Section -->