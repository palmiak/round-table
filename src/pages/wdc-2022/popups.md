<!-- .slide: class="title-slide title-slide--top" data-background-color="var(--fuschia)" -->

## Open UI Pop-up

---
<!-- .slide: data-background-color="var(--white)" -->
<div class="support-grid">
  <span class="browser-logo" data-browser="canary"></span>
  <span class="browser-logo" data-browser="chrome"></span>
  <span class="browser-logo" data-browser="edge"></span>
  <span class="browser-logo" data-browser="safari"></span>
  <span class="browser-logo" data-browser="firefox"></span>
  <span class="browser-version" data-supported>
    <span class="material-symbols-outlined">
      flag
    </span>
  </span>
  <span class="browser-version">&times;</span>
  <span class="browser-version">&times;</span>
  <span class="browser-version">&times;</span>
  <span class="browser-version">&times;</span>
</div>
---
<!-- .slide: data-background-video="/shared/video/pop-up-stack.mp4" data-background-video-loop="true" data-background-video-muted="true" data-background-video-size="cover" -->
---
<!-- .slide: class="title-slide title-slide--bottom" data-background-color="var(--black)" -->
## The goal of the <span style="color: var(--citric);">Open UI</span> initiative is to make it <span style="color: var(--blueberry)">easier</span> for developers to make <span style="color: var(--fuschia);">great user experiences</span>
---
<!-- .slide: data-background-color="var(--citric)" -->

```js []
const PopUp = ({ children }) => {
  return (
    <div className="pop-up" style={{ zIndex: Date.now() }}>
      {children}
    </div>
  )
}
```
---
<!-- .slide: class="title-slide title-slide--bottom" data-background-image="/shared/images/king.jpg" data-background-opacity="0.4" -->
## What's the top layer? A place outside of the <span style="background-color: var(--cinnabar);">document</span> flow. A place where <span style="background-color: var(--chateau);">z-index</span> has no effect. Where every element has a styleable <span style="background-color: var(--selective);">::backdrop</span>.
<!-- --- -->
<!-- slide: data-background-color="var(--cinnabar)" -->
<!-- ```js []
// Current ways to get into the "Top Layer"
Dialog.showModal();
Element.requestFullscreen();
```
--- -->
<!-- ```html []
<div id="my-first-popup" popup>PopUp Content!</div>
<button popuptoggletarget="my-first-popup">Toggle Pop-Up</button>
```

<iframe src="/demos/openui-pop-ups/first" class="demo-embed"></iframe>
--- -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/with-backdrop" -->
---
<!-- .slide: data-background-color="var(--white)" -->
<ul class="bullets">
  <li>Hidden by default</li>
  <li>No JavaScript</li>
  <li>No z-index fighting</li>
  <li>Light dismiss</li>
</ul>
---
<!-- .slide: data-background-color="var(--fuschia)" -->
```html [8,9,11]
<html>
  <head>
    <title>First Pop-up</title>
  </head>
  <body>
    <main>
      <!-- Throw all your z-index at me! -->
      <button popovertoggletarget="my-first-pop-up">
      </button>
      <!-- Don't care where this is to be honest -->
      <div id="my-first-pop-up" popover>Pop-up content!</div>
      <header>
        <h1>Awesome Website</h1>
      </header>
      <article>
        <p> Lorem ipsum dolor sit...</p>
      </article>
    </main>
  </body>
</html>
```
---
<!-- .slide: data-background-color="var(--chateau)" -->
```css [|9]
[popover] {
  transform:
    translate(-50%, -50%)
    translateY(calc((1 - var(--open, 0)) * 100vh))
    scale(var(--open, 0));
  transition: transform 0.5s;
}

[popover]:open {
  --open: 1;
}
```
---
<!-- .slide: class="title-slide title-slide--top" data-background-color="var(--black)" -->
## <span style="color: var(--fuschia)">Better developer experience</span> leads to less opportunity for poor <span style="color: var(--citric)">user experience</span>
---
<!-- slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/ascension" -->
<!-- --- -->
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/balloon-animation" -->
---
<!-- .slide: data-background-color="var(--blueberry)" -->
```html [|3,8]
<div id="code-pop-up" class="balloon" popover>
  <div class="balloon__content">
    <button class="button ripple" popoverhidetarget="code-pop-up">
      Hide Code
    </button>
  </div>
</div>
<button class="button ripple" popovershowtarget="code-pop-up">
  Reveal Code
</button>
```
---
<!-- slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/balloon-animation" -->
<!-- --- -->
<!-- ```css []
@media (prefers-reduced-motion: no-preference) {
  [popover] {
    animation: exit-animation 250ms ease-out both;
  }

  [popover]:open {
    animation: entry-animation 1s ease-in both;
  }

  @keyframes exit-animation {
    100% {
      transform: translate(-50%, -50%) translateY(-100vh) scale(0);
    }
  }

  @keyframes entry-animation {
    0% {
      transform: translate(-50%, -50%) translateY(100vh) scale(0);
    }
  }
}
``` -->
<!-- --- -->
<!-- slide: class="title-slide title-slide--left" data-background-color="var(--cinnabar)" -->
<!-- ## Types && Behavior
--- -->
<!-- .slide: data-background-color="var(--cinnabar)" -->
## Types && Behavior
```html []
<!-- Nesting support -->
<div popover=auto>

<!-- Explicit dismiss -->
<div popover=manual>

<!-- Open on render, no "hint" -->
<div popover defaultopen>

<!-- Focus management -->
<div popover>
  <input autofocus type="text">
</div>
```
---
<!-- - Nesting support via ancestral pop-ups
- Dismisses pop-ups that aren't ancestral
- Dismissing in the stack only dismisses those above
--- -->
<!-- slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/auto" -->
<!-- ---
```html [|3]
<div id="blue-two" class="blue" popover>
  <div class="card elevated">
    <button popovershowtarget="red-one" class="button ripple">
      Take first red candy
    </button>
    <button popovershowtarget="blue-three" class="button ripple">
      Take another blue candy
    </button>
    <button popoverhidetarget="blue-two" class="button ripple">
      Put this candy back
    </button>
    <button popoverhidetarget="blue-one" class="button ripple">
      Put back blue candies
    </button>
  </div>
</div>
``` -->
<!-- --- -->
<!-- ## Hint
```html []
<div popover=hint>
```
--- -->
<!-- - Singleton
- Doesn't dismiss other types
- Can't use `defaultopen`
--- -->
<!-- slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/hint" -->
<!-- ---
```html [|3]
<div id="blue-pill" class="blue" popover="hint">
  <div class="card elevated">
    <button popovershowtarget="red-pill" class="button ripple">
      Actually, take the red pill
    </button>
    <button popoverhidetarget="blue-pill" class="button ripple">
      Still deciding
    </button>
  </div>
</div>
```
--- -->
<!-- ## Manual
```html []
<div popover=manual>
```
--- -->
<!-- - Doesn't dismiss others
- No light dismiss
- Only closed explicitly via trigger or JavaScript
--- -->
<!-- slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/manual" -->
<!-- ---
```html [|6,14]
<div popover="manual" defaultopen id="window">
  <div class="window">
    <div class="title-bar">
      <div class="title-bar-text">Manual Pop-up</div>
      <div class="title-bar-controls">
        <button aria-label="Close" popoverhidetarget="window"></button>
      </div>
    </div>
    <div class="window-body">
      <p>
        The only way to remove me is via a trigger element, or with
        JavaScript.
      </p>
      <button popoverhidetarget="window">Close</button>
    </div>
  </div>
</div>
``` -->
<!-- --- -->
<!-- .slide: data-background-color="var(--selective)" -->
## JS API
```js []
/* Show a pop-up */
popUpElement.showPopover()
/* Hide a pop-up */
popUpElement.hidePopover()
/* Is the pop-up in the top layer */
popUpElement.matches(':open')
/* Listen for pop-up events */
popUpElement.addEventListener('popovershow', doSomethingWhenPopUpShows)
popUpElement.addEventListener('popoverhide', doSomethingWhenPopUpHides)
/* You can cancel a show */
popUpElement.addEventListener('popovershow',event => {
  event.preventDefault();
  console.warn(‘We blocked a pop-up from being shown’);
})
/* You can't cancel a hide */
popUpElement.addEventListener('popoverhide',event => {
  event.preventDefault();
  console.warn("You aren't allowed to cancel the hiding of a pop-up");
})
```
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/poppers" -->
---
<!-- ```html []
<button
  popover="manual"
  class="balloon"
  id="P"
  defaultopen
  title="Pop 'P'"
  style="--index: -2.5; --hue: 107; --bob-speed: 1; --float-speed: 0.9;"
>
  <span class="balloon__content">
    <span class="balloon__letter">P</span>
    <span class="balloon__handle"></span>
  </span>
</button>
```

<div>

```js []
POPUP.addEventListener("click", () => {
  AUDIO_POP.currentTime = 0;
  AUDIO_POP.play();
  POPUP.hidePopover();
  Object.assign(POPUP, {
    style: `
    --index: ${START_INDEX + p};
    --hue: ${Math.random() * 359};
    --bob-speed: ${Math.random() + 0.5};
    --float-speed: ${Math.random() + 0.5};
  `
  });
  requestAnimationFrame(() => POPUP.showPopover());
});
```

</div> -->
<!-- --- -->
<!-- ## Accessibility && Focus
```html [|4]
<div id="input-pop-up" popover>
  <div class="card elevated">
    <label for="name">Name</label>
    <input id="name" autofocus type="text">
    <button class="button ripple" popoverhidetarget="input-pop-up">Close</button>
  </div>
</div>
```
--- -->
<!-- slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/autofocus" -->
<!-- --- -->
<!-- .slide: class="title-slide title-slide--top" data-background-color="var(--fuschia)"-->
## Breathe new life into old friends
---
<!-- ### Nav Drawer
--- -->
<!-- .slide: data-background-color="var(--white)" data-background-iframe="/demos/openui-pop-ups/nav-drawer" -->
---
<!-- .slide: data-background-color="var(--citric)" -->
```css [|17, 18, 19]
[popover] {
  left: 100%;
  width: var(--nav-width);
  transition: transform 0.2s;
  transform: translateX(calc(var(--open, 0) * -100%));
}

[popover]::backdrop {
  transition: opacity 0.2s;
  opacity: var(--open, 0);
}

[popover]:open,
[popover]:open::backdrop {
  --open: 1;
}
body:has([popover]:open) {
  transform: translateX(calc(var(--nav-width) * -1));
}
```
---
<!-- ### Custom Cursor
--- -->
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/custom-cursor" -->
---
<!-- <div>

```html []
<canvas
  id="custom-cursor"
  class="custom-cursor"
  popover="manual"
  defaultOpen
></canvas>
```

</div>

```js []
document.body.addEventListener("popovershow", (e) => {
  if (canvas.matches(":open") && e.target !== canvas) {
    canvas.hidePopover();
    requestAnimationFrame(() => {
      canvas.showPopover();
    });
  }
});
```
--- -->
<!-- ### Toasts
--- -->
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/toasts" -->
<!-- ---
```html []
<div popover="manual" class="toasts">
  <ul class="toasts__drawer">
  </ul>
</div>
``` -->
---
<!-- ### Command Palette
--- -->
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/command-palette" -->
---
<!-- .slide: data-background-color="var(--selective)" -->
```html []
<div id="spotlight" popover>
  <input
    autocomplete="off"
    role="combobox"
    spellcheck="false"
    aria-expanded="false"
    aria-controls="spotlight-options"
    aria-activedescendant=""
    autofocus
    id="spotlight-search"
    type="text"
    placeholder="Pop-up search..."
  />
  <div popover defaultopen id="spotlight-options" role="listbox">
    <!-- "Options" get injected here -->
  </div>
</div>
```
---
<!-- ---
```js []
/* Show the pop-up then you get light dismiss etc. for free! */
const handleActivation = (e) => {
  if (e.keyCode === CMD && !STATE.cmd) STATE.cmd = true;
  if (e.keyCode === MOD && STATE.cmd && !STATE.mod) STATE.mod = true;

  if (STATE.cmd && STATE.mod && !POPUP.matches(":open")) {
    STATE.cmd = STATE.mod = false;
    POPUP.showPopover();
    OPTIONS.showPopover();
  }
};
``` -->
<!-- ---
### Screensaver
--- -->
<!-- .slide: data-background-color="var(--white)" data-background-iframe="/demos/openui-pop-ups/screensaver" -->
---
<!-- .slide: data-background-color="var(--fuschia)" -->
```html []
<div id="screensaver" popover>
  <div class="dvd">
    <div class="dvd__scale">
      <div class="dvd__slide">
        <svg xmlns="http://www.w3.org/2000/svg" viewbox="8 44 178 104">
        </svg>
      </div>
    </div>
  </div>
</div>
```
---
<!-- ### Floating Actions
--- -->
<!-- slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/floating-action" -->
<!-- --- -->
<!-- .slide: style="--code-size: 0.325em;" -->
<!-- ```html []
<button
  class="fab secondary"
  popover="manual"
  defaultopen
  popovertoggletarget="menu"
>
  <i class="material-icons">add</i>
</button>
<div id="menu" class="fab__menu" popover="auto" style="--count: 3">
  <ul class="fab__menu-items">
    <li class="fab__menu-item">
      <button
        autofocus
        class="fab"
        style="--index: 0"
        popoverhidetarget="menu"
      >
        <i class="material-icons">chat</i>
      </button>
    </li>
    <li class="fab__menu-item">
      <button
        class="fab"
        style="--index: 1"
        popoverhidetarget="menu"
      >
        <i class="material-icons">photo_camera</i>
      </button>
    </li>
    <li class="fab__menu-item">
      <button
        class="fab"
        style="--index: 2"
        popoverhidetarget="menu"
      >
        <i class="material-icons">pin_drop</i>
      </button>
    </li>
  </ul>
</div>
```
--- -->
<!-- ### Webcam
--- -->
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/webcam-throw" -->
---
<!-- .slide: style="--code-size: 0.325em;" data-background-color="var(--spearmint)" -->
```html []
<button
  popover="manual"
  defaultopen
  popovertoggletarget="menu"
>
  <i class="material-icons">add</i>
</button>
<div id="menu" class="fab__menu" popover="auto" style="--count: 3">
  <ul class="fab__menu-items">
    <li class="fab__menu-item">
      <button
        autofocus
        class="fab"
        style="--index: 0"
        popoverhidetarget="menu"
      >
        <i class="material-icons">chat</i>
      </button>
    </li>
    <li class="fab__menu-item">
      <button
        class="fab"
        style="--index: 1"
        popoverhidetarget="menu"
      >
        <i class="material-icons">photo_camera</i>
      </button>
    </li>
    <li class="fab__menu-item">
      <button
        class="fab"
        style="--index: 2"
        popoverhidetarget="menu"
      >
        <i class="material-icons">pin_drop</i>
      </button>
    </li>
  </ul>
</div>
```
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/strange-portal" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/error-heaven" -->
---
<!-- End Section