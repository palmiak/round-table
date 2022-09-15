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

## Tweet Deck

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
  <video autoplay loop muted src="/tpac-2022/assets/waze.mp4"></video>
  <div>
    <h6>And many more...</h6>
  </div>
</div>

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->
## Notice all the pop-ups?

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
- Could require a certain DOM structure.<br>Mmm wrappers.
- Hard to scale/respond to viewport.

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

<img src="/tpac-2022/assets/tooltip-anatomy.png" />

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

<img src="/tpac-2022/assets/tooltip-anatomy.png" />

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

<img src="/tpac-2022/assets/tooltip-anatomy.png" />

---

<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

## That's it, right?
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
  <video autoplay loop muted src="/tpac-2022/assets/wikipedia.mp4"></video>
  <img src="/tpac-2022/assets/edge-cases.png" />
  <video autoplay loop muted src="/tpac-2022/assets/waze.mp4"></video>
</div>

---
<!-- .slide: data-background-color="hsl(210 80% 20%)" -->

## Someone's solved it, right?