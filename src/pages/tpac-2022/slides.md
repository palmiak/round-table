<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
## CSS Anchoring ⚓️
##### TPAC 2022 
###### Jhey Tompkins - Google

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
<div class="content-warning">
  <div>Content</div>
  <div>Advisory</div>
  <div>Experimental Content</div>
</div>

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

![Your CSS Needs You](/tpac-2022/assets/your-css-needs-you.jpg)

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

- A common pattern
- A tricky pattern
- A headache for developers

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
<div class="tweet-deck">
  <img src="/tpac-2022/assets/tweet-one.png" />
  <img src="/tpac-2022/assets/tweet-two.png" />
  <img src="/tpac-2022/assets/tweet-three.png" />
  <img src="/tpac-2022/assets/tweet-four.png" />
  <img src="/tpac-2022/assets/tweet-five.png" />
  <img src="/tpac-2022/assets/tweet-six.png" />
  <div>
  <img src="/tpac-2022/assets/tweet-seven.png" />
  <img src="/tpac-2022/assets/tweet-eight.png" />
  </div>
  <img src="/tpac-2022/assets/tweet-nine.png" />  
  <img src="/tpac-2022/assets/tweet-ten.png" /> 
  <div>
    <img src="/tpac-2022/assets/tweet-eleven.png" />
    <img src="/tpac-2022/assets/tweet-twelve.png" />
  </div>
</div> 

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

### Anchor positioning<br>around the web

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

<div class="image-grid">
  <img src="/tpac-2022/assets/click-to-tooltip.png"/>
  <img src="/tpac-2022/assets/github-issue.png"/>
  <img src="/tpac-2022/assets/maps.png"/>
  <img src="/tpac-2022/assets/github-menu.png"/>
  <img src="/tpac-2022/assets/survey.png"/>
  <img src="/tpac-2022/assets/notion.png"/>
  <video controls autoplay loop muted src="/tpac-2022/assets/waze.mp4"></video>
  <div>
    <h6>And many more...</h6>
  </div>
</div>

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
## Notice all the pop-ups?
###### A lot of these use cases<br>want to get something into the top layer

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
<img src="/tpac-2022/assets/tooltip-anatomy.png" />

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
## What's the solution?

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
## CSS
- Absolute positioning
- Could require a certain DOM structure.<br>Mmm wrappers
- Potential for invalid HTML
- Hard to scale/respond to viewport

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="split-screen" -->

<div>

```html
<div class="containing-block">
  <div class="tooltip">Anchor me!</div>
  <div class="anchor">The anchor</div>
</div>
```
```css
.containing-block {
  position: relative;
}
.tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
}
```

</div>

<img src="/tpac-2022/assets/anchor-implementation.png" />

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="split-screen" -->

<div>

```html
<div class="tooltip">Anchor me!</div>
<div class="anchor">The anchor</div>
```
```css
:root {
  --anchor-width: 40px;
  --anchor-top: 100px;
  --anchor-left: 200px;
}
.anchor {
  position: absolute;
  top: var(--anchor-top);
  width: var(--anchor-width);
}
.tooltip {
  position: absolute;
  top: calc(var(--anchor-top) - 10px);
  left: calc(
    (var(--anchor-width) * 0.5)
    + var(--anchor-left)
  );
  transform: translate(-50%, -100%);
}
```

</div>

<img src="/tpac-2022/assets/anchor-implementation.png" />

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

## JavaScript
- Some boilerplate
- Styles are leaking into script land
- Asks questions
  - When?
  - How?
  - Offsets?

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="split-screen" style="--col-one: 60%; --col-two: 40%; --code-size: 0.65rem;" -->
<div>

  ```html
  <div class="tooltip">Anchor me!</div>
  <div class="anchor">The anchor</div>
  ```
  ```css
  .tooltip {
    position: absolute;
    top: calc(var(--y) - 10px);
    left: calc((var(--width) * 0.5) + var(--x));
    transform: translate(-50%, -100%);
  }
  ```
  ```js
  const setAnchorPosition = (anchored, anchor) => {
    const bounds = anchor.getBoundingClientRect().toJSON();
    for (const [key, value] of Object.entries(bounds)) {
      anchored.style.setProperty(`--${key}`, value)
    }
  }
  setAnchorPosition(
    document.querySelector('.tooltip'),
    document.querySelector('.anchor')
  )
  ```
</div>

<img src="/tpac-2022/assets/anchor-implementation.png" />

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

## They all looked...<br>the same?
- Right! This is about developer experience/perspective.
- The better the DX, the less opportunity for poor UX.

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

## So That's it, right?
#### One problem...

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="split-screen" -->

<div>

### It's not responsive
- Where should it position itself?
- When to update?
- How do I know when it's out of view?
- What's the threshold?
- Scroll position?

</div>

<div class="image-collage">
  <video controls autoplay loop muted src="/tpac-2022/assets/wikipedia.mp4"></video>
  <img src="/tpac-2022/assets/edge-cases.png" />
  <video controls autoplay loop muted src="/tpac-2022/assets/waze.mp4"></video>
</div>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

## Someone's solved it, right?

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" -->
## Popper.js

<div>

- Interactions handled via JavaScript
- Lots of configuration/choices
  - GPU
  - Placements
  - Padding
  - Offset
- Feels "CSS in JS"
- An extra dependency to learn/maintain (~3kB)


</div>

<div class="stats-holder">
  <video autoplay loop muted controls class="media" src="/tpac-2022/assets/popper.mp4"></video>
  <img class="take" src="/tpac-2022/assets/extra-dependency.png" />
  <img class="code" src="/tpac-2022/assets/popper-code.png" />
  <img class="stats" src="/tpac-2022/assets/popper-stats.png" />
</div>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header floating" -->
## ~~Popper.js v3~~ Floating UI

<div>

- Same maintainer
- Same choices
  - GPU
  - Placements
  - Padding
  - Offset
- An extra dependency to learn/maintain
- Lighter (~2kB)
- Confused?


</div>

<div class="stats-holder floating">
  <video autoplay loop muted controls class="media" src="/tpac-2022/assets/floating-use.mp4"></video>
  <img class="take" src="/tpac-2022/assets/floating-evolve.png" />
  <img class="code" src="/tpac-2022/assets/floating-code.png" />
  <img class="stats" src="/tpac-2022/assets/floating-stats.png" />
</div>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header floating" -->

## Let's keep the styles<br>in our styles

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="split-screen" -->

<img src="/tpac-2022/assets/tooltip-anatomy.png" />
<img src="/tpac-2022/assets/metaphor.png" />

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" -->
## CSS Anchoring API
- Anchor elements to each other without JavaScript
- Let the browser work out the best position 👉
- No dependencies
- No wrapper elements
- Spec: [specs/css-anchor-position](https://tabatkins.github.io/specs/css-anchor-position)

<video autoplay loop muted controls src="/tpac-2022/assets/viewport-resizing.mp4"></video>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
## We're experimenting<br>and learning!

<video autoplay loop muted controls src="/tpac-2022/assets/position-fallback-code.mp4" style="width: 25vmin;"></video>

Demos 👉 [codepen.io/collection](https://codepen.io/collection/qOEKVN)

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" -->
## Basic Anchor

<div>

```html
<div class="anchor"></div>
<div class="boat-one"></div>
<div class="boat-two"></div>
```

```css
.anchor {
  anchor-name: --anchor;
}

.boat-one {
  left: calc(
    anchor(--anchor left) +
    (anchor-size(--anchor width) * 0.5)
  );
  bottom: anchor(--anchor top);
  transform: translateX(-50%);
}

.boat-two {
  left: anchor(--anchor right);
  top: anchor(--anchor bottom);
}
```

</div>

<video loop autoplay controls muted src="/tpac-2022/assets/basic-anchoring.mp4"></video>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" -->
## What's happening?

- Elements can be anywhere
- Browsers works out the anchor position and size
- Used by position properties for anchored element
- Containments works as usual for positioning but the browser handles offsets

<video loop autoplay controls muted src="/tpac-2022/assets/basic-anchoring.mp4"></video>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" style="--code-size: 0.65rem;" -->
## Fallbacks in action

<div>

```css
.anchor {
  anchor-name: --anchor;
}

.boat {
  position-fallback: --compass;
}

@position-fallback --compass {
  @try {
    bottom: anchor(--anchor top);
    right: anchor(--anchor left);
  }
  @try {
    bottom: anchor(--anchor top);
    left: anchor(--anchor right);
  }
  @try {
    top: anchor(--anchor bottom);
    right: anchor(--anchor left);
  }
  @try {
    top: anchor(--anchor bottom);
    left: anchor(--anchor right);
  }
}
```

</div>

<video loop autoplay controls muted src="/tpac-2022/assets/dynamic-anchoring.mp4"></video>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" -->
## Viewport resizing

<div>

```css
.anchor {
  anchor-name: --anchor;
}

.boat {
  position-fallback: --top-to-bottom;
}

@position-fallback --top-to-bottom {
  @try {
    bottom: anchor(--anchor top);
    right: anchor(--anchor left);
  }
  @try {
    top: anchor(--anchor bottom);
    right: anchor(--anchor left);
  }
}
```

</div>

<video loop autoplay controls muted src="/tpac-2022/assets/viewport-resizing.mp4"></video>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" -->
## Container resizing

<div>

```css
.anchor {
  anchor-name: --anchor;
}

.boat {
  position-fallback: --top-to-bottom;
}

@position-fallback --top-to-bottom {
  @try {
    bottom: anchor(--anchor top);
    right: anchor(--anchor left);
  }
  @try {
    top: anchor(--anchor bottom);
    right: anchor(--anchor left);
  }
}
```

<sub>The lake versus the ocean</sub>

</div>

<video loop autoplay controls muted src="/tpac-2022/assets/lake-vs-ocean.mp4"></video>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" style="--code-size: 0.5rem" -->
## Content [Out]

<div>

```html
<dialog style="--position-fallback: --fish-set; --anchor: --fish;">
  Wet slippery thing.
</dialog>
<a style="--anchor-name: --fish;">fish</a>
```  

```css
a {
  anchor-name: var(--anchor-name);
}
dialog {
  position-fallback: var(--position-fallback);
}

@position-fallback --fish-set {
  @try {
    bottom: anchor(--fish top);
    right: anchor(--fish left);
  }
  @try {
    bottom: anchor(--fish top);
    left: anchor(--fish right);
  }
}

@position-fallback --tuxedo-set {
  @try {
    bottom: anchor(--tuxedo top);
    right: anchor(--tuxedo left);
  }
  @try {
    bottom: anchor(--tuxedo top);
    left: anchor(--tuxedo right);
  }
}
```

<sub>You may want to clip on a certain axis</sub>

</div>

<video loop autoplay controls muted src="/tpac-2022/assets/tooltips-out.mp4"></video>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" style="--code-size: 0.5rem" -->
## Content [In]

<div>

```html
<dialog style="--position-fallback: --fish-set; --anchor: --fish;">
  Wet slippery thing.
</dialog>
<a style="--anchor-name: --fish;">fish</a>
```  

```css
a {
  anchor-name: var(--anchor-name);
}
dialog {
  position-fallback: var(--position-fallback);
}

@position-fallback --fish-set {
  @try {
    bottom: anchor(--fish top);
    right: anchor(--fish left);
  }
  @try {
    bottom: anchor(--fish top);
    left: anchor(--fish right);
  }
}

@position-fallback --tuxedo-set {
  @try {
    bottom: anchor(--tuxedo top);
    right: anchor(--tuxedo left);
  }
  @try {
    bottom: anchor(--tuxedo top);
    left: anchor(--tuxedo right);
  }
}
```

<sub>Now constrained by the scroller</sub>

</div>

<video loop autoplay controls muted src="/tpac-2022/assets/tooltips-in.mp4"></video>

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" style="--code-size: 0.5rem"
## Viewport Detection [Scroll]


--- -->

<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" -->


<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
## Where we need this

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header"-->
## Pop-ups

<div>

  - Anchoring things in the top layer
  - No out of the box way to do this... yet 🙏
  - JavaScript solutions sometimes hit limits

</div>

<video loop autoplay controls muted src="/tpac-2022/assets/resizeobserver-loop.mp4"></video>

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header"-->
## &lt;selectmenu&gt;

<div>

  - Uses [popup] for the listbox
  - Microsoft demos: [demos/selectmenu](https://microsoftedge.github.io/Demos/selectmenu/)

</div>

<video loop autoplay controls muted src="/tpac-2022/assets/selectmenu.mp4"></video>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
## Bonus

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" -->

## Charts

<div>
  
  - Think of the combos with many anchors and calc!

  ```css
  .chart__tooltip--max {
    position: absolute;
    left: anchor(--chart right);
    bottom: max(
      anchor(--anchor-1 top),
      anchor(--anchor-2 top),
      anchor(--anchor-3 top)
    );
    translate: 0 50%;
  }
  ```

</div>

<video loop autoplay controls muted src="/tpac-2022/assets/anchor-charts.mp4"></video>

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header" style="--code-size: 0.65rem;"-->
## Menus

<div>
  
  - Nested anchors!

  ```html
  <!-- Markup obfuscated  -->
  <header style="position: relative;">
    <nav style="position: relative;">
      <span class="nav-links">
        <button id="products-btn">Products</button>
      </span>
      <div popup id="products">
        <button id="css-btn">CSS</button>
      </div>
    </nav>
    <div popup id="css"></div>
  </header>
  ```

  ```css
  #products-btn {
    anchor-name: --products;
  }
  #products {
    position: absolute;
    left: anchor(--products left);
    top: anchor(--products bottom);
  }
  #css-btn {
    anchor-name: --css;
  }
  #css {
    position: absolute;
    top: anchor(--css top);
    left: anchor(--css right);
  }
  ```

</div>

<video loop autoplay controls muted src="/tpac-2022/assets/nested-menu.mp4"></video>

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
## Fin.


---

<!-- .slide: data-background-color="hsl(210 80% 20%)" class="code-grid-with-header"-->
## Talking points
- How to detect which side your arrow goes on? Position query?
- Detecting when something is "Out of bounds"
- How to create lots of `position-fallback` sets? Scoped custom properties?

<div>

```css
[popup=hint] {
  --anchor: --some-anchor-link;
  position-fallback: --dynamic-reusable;
}

@position-fallback --dynamic-reusable {
  /* Uses custom property scope instead? */
  @try {
    top: anchor(var(--anchor) top);
    left: anchor(var(--anchor) right);
  }
}
```

</div>