<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

## Open UI Pop-up

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
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
## The goal of the Open UI initiative is to make it easier for developers to make great user experiences.
---
<div>

```css []
.pop-up {
  z-index: 9999999;
}
```
</div>

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
## How to make sure it gets placed above the rest of your content. How to make it accessible.
---
```js []
// Current ways to get into the "Top Layer"
Dialog.showModal();
Element.requestFullscreen();
```
---
<!-- .slide: data-background-image="/shared/images/king.jpg" data-background-opacity="0.25" -->
## What's the top layer? A place outside of the `document` flow. A place where `z-index` has no effect. Where every element has a styleable `::backdrop`.
---
## Better DX leads to less opportunity for poor UX
---
```html []
<div id="my-first-popup" popup>PopUp Content!</div>
<button popuptoggletarget="my-first-popup">Toggle Pop-Up</button>
```

<iframe src="/demos/openui-pop-ups/first" class="demo-embed"></iframe>
---
- Hidden by default
- No JavaScript
- No `z-index` fighting
- Light dismiss out of the box
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/with-backdrop" -->
---
```html []
<html>
  <head>
    <title>First Pop-up</title>
  </head>
  <body>
    <main>
      <!-- Throw all your z-index at me! -->
      <button popuptoggletarget="my-first-pop-up" class="button fab ripple">
      </button>
      <!-- Don't care where this is to be honest -->
      <div id="my-first-pop-up" popup>Pop-up content!</div>
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
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/ascension" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/balloon-transition" -->
---
```html [|3,8]
<div id="code-pop-up" class="balloon" popup>
  <div class="balloon__content">
    <button class="button ripple" popuphidetarget="code-pop-up">
      Hide Code
    </button>
  </div>
</div>
<button class="button ripple" popupshowtarget="code-pop-up">
  Reveal Code
</button>
```

<div>
  
```css [|9]
[popup] {
  transform:
    translate(-50%, -50%)
    translateY(calc((1 - var(--open, 0)) * 100vh))
    scale(var(--open, 0));
  transition: transform 0.5s;
}

[popup]:open {
  --open: 1;
}
```

</div>
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/balloon-animation" -->
---
```css []
@media (prefers-reduced-motion: no-preference) {
  [popup] {
    animation: exit-animation 250ms ease-out both;
  }

  [popup]:open {
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
```
---
## Types
---
## Auto (Default)
```html []
<div popup popup=auto>
```
---
- Nesting support via ancestral pop-ups
- Dismisses pop-ups that aren't ancestral
- Dismissing in the stack only dismisses those above
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/auto" -->
---
```html [|3]
<div id="blue-two" class="blue" popup>
  <div class="card elevated">
    <button popupshowtarget="red-one" class="button ripple">
      Take first red candy
    </button>
    <button popupshowtarget="blue-three" class="button ripple">
      Take another blue candy
    </button>
    <button popuphidetarget="blue-two" class="button ripple">
      Put this candy back
    </button>
    <button popuphidetarget="blue-one" class="button ripple">
      Put back blue candies
    </button>
  </div>
</div>
```
---
## Hint
```html []
<div popup=hint>
```
---
- Singleton
- Doesn't dismiss other types
- Can't use `defaultopen`
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/hint" -->
---
```html [|3]
<div id="blue-pill" class="blue" popup="hint">
  <div class="card elevated">
    <button popupshowtarget="red-pill" class="button ripple">
      Actually, take the red pill
    </button>
    <button popuphidetarget="blue-pill" class="button ripple">
      Still deciding
    </button>
  </div>
</div>
```
---
## Manual
```html []
<div popup=manual>
```
---
- Doesn't dismiss others
- No light dismiss
- Only closed explicitly via trigger or JavaScript
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/manual" -->
---
```html [|6,14]
<div popup="manual" defaultopen id="window">
  <div class="window">
    <div class="title-bar">
      <div class="title-bar-text">Manual Pop-up</div>
      <div class="title-bar-controls">
        <button aria-label="Close" popuphidetarget="window"></button>
      </div>
    </div>
    <div class="window-body">
      <p>
        The only way to remove me is via a trigger element, or with
        JavaScript.
      </p>
      <button popuphidetarget="window">Close</button>
    </div>
  </div>
</div>
```
---
## JS API
```js []
/* Show a pop-up */
popUpElement.showPopUp()
/* Hide a pop-up */
popUpElement.hidePopUp()
/* Is the pop-up in the top layer */
popUpElement.matches(':open')
/* Listen for pop-up events */
popUpElement.addEventListener('show', doSomethingWhenPopUpShows)
popUpElement.addEventListener('hide', doSomethingWhenPopUpHides)
/* You can cancel a show */
popUpElement.addEventListener('show',event => {
  event.preventDefault();
  console.warn(‘We blocked a pop-up from being shown’);
})
/* You can't cancel a hide */
popUpElement.addEventListener('hide',event => {
  event.preventDefault();
  console.warn("You aren't allowed to cancel the hiding of a pop-up");
})
```
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/poppers" -->
---
```html []
<button
  popup="manual"
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
  POPUP.hidePopUp();
  Object.assign(POPUP, {
    style: `
    --index: ${START_INDEX + p};
    --hue: ${Math.random() * 359};
    --bob-speed: ${Math.random() + 0.5};
    --float-speed: ${Math.random() + 0.5};
  `
  });
  requestAnimationFrame(() => POPUP.showPopUp());
});
```

</div>
---
## Accessibility && Focus
```html [|4]
<div id="input-pop-up" popup>
  <div class="card elevated">
    <label for="name">Name</label>
    <input id="name" autofocus type="text">
    <button class="button ripple" popuphidetarget="input-pop-up">Close</button>
  </div>
</div>
```
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/autofocus" -->
---
## Breathe new life into old friends
---
### Nav Drawer
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/nav-drawer" -->
---
### Custom Cursor
---
### Toasts
---
### Command Palette
---
### Screensaver
---
### Floating Actions
---
### Webcam
---
### Portals
---
<!-- End Section -->