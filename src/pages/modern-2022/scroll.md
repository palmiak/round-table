<!-- .slide: class="title-slide title-slide--bottom" data-background-color="var(--citric)"-->
<!-- If you want to do everything in Canary with the polyfill -->
<!-- open -a /Applications/Google\ Chrome\ Canary.app --args --disable-blink-features=CSSScrollTimeline,ScrollTimeline -->
## Scroll Linked Animations
---
<!-- .slide: data-background-color="hsl(0 0% 0%)" -->
<div class="support-grid">
  <span class="browser-logo" data-browser="chrome"></span>
  <span class="browser-logo" data-browser="edge"></span>
  <span class="browser-logo" data-browser="safari"></span>
  <span class="browser-logo" data-browser="firefox"></span>
  <span class="browser-version" data-supported>
    <span class="material-symbols-outlined">
      format_paint
    </span>
  </span>
  <span class="browser-version" data-supported>
    <span class="material-symbols-outlined">
      format_paint
    </span>
  </span>
  <span class="browser-version" data-supported>
    <span class="material-symbols-outlined">
      format_paint
    </span>
  </span>
  <span class="browser-version" data-supported>
    <span class="material-symbols-outlined">
      format_paint
    </span>
  </span>
</div>
---
<!-- .slide: data-background-color="var(--selective)" -->
```css [|3,4,9,22|10,11,12]
/* ViewTimeline */
section {
  view-timeline-name: --section;
  view-timeline-axis: block;
}
img {
  animation: parallax both linear;
  animation-timeline: --section;
  /* Likely to change */
  animation-delay: cover 95%;
  animation-end-delay: exit 75%;
}
@keyframes parallax {
  to {
    transform: translateY(100%);
  }
}
/* ScrollTimeline */
.progress {
  animation: progress both linear;
  animation-timeline: scroll(root);
}
@keyframes progress {
  to {
    rotate: 360deg;
  }
}
```

<sub>You can use this with JavaScript's Web Animations API too!</sub>
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/image-reveals" -->
---
<!-- .slide: data-background-color="var(--spearmint)" -->
```html []
<html>
  <head>
    <title>Scroll Linked Image Reveals</title>
  </head>
  <body>
    <section>
      <h1>Scroll 👇</h1>
    </section>
    <section>
      <img src="/shared/images/starry-night.jpeg">
    </section>
    <section>
      <img src="/shared/images/night-mountain.jpeg">
    </section>
  </body>
</html>
```
---
<!-- .slide: data-background-color="var(--blueberry)" -->
```css [|3,4,5,6]
img {
  animation: scale-in both linear;
  view-timeline: --in;
  animation-timeline: --in;
  animation-delay: enter 0%;
  animation-end-delay: cover 50%;
  scroll-snap-align: center;
}

@keyframes scale-in {
  0% {
    scale: 0;
  }
}

```
---
<!-- .slide: data-background-color="var(--selective)" -->
```js [|1-6,15,17-23]
const TIMELINE = new ViewTimeline({
  // Thing you're tracking in the viewport
  subject: IMG,
  // Vertical or Horizontal
  axis: 'block' // || 'inline'
})
// WAAPI Support
IMG.animate(
  [
    {
      scale: 0
    },
    {
      scale: 1
    }
  ],
  {
    timeline: TIMELINE,
    fill: 'both',
    delay: {
      phase: 'cover' // || 'exit' || 'enter' || 'contain', 
      percent: CSS.percent(30),
    },
    endDelay: {
      phase: 'cover', 
      percent: CSS.percent(50),
    }
  }
)

```
---
<!-- .slide: data-background-color="hsl(0 0% 0%)" data-background-iframe="/demos/scroll-linked-animations/tokyo-scroll" -->
---
<!-- .slide: data-background-color="hsl(0 0% 0%)" data-background-iframe="/demos/scroll-linked-animations/dj-deck" -->
---
<!-- .slide: data-background-color="hsl(0 0% 0%)" data-background-iframe="/demos/device/deviceorientation-dj" -->
<h3 class="daniel-phiri">h/t <span style="color: var(--fuschia)">Daniel Phiri</span> @ strapi</h3>
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/this-is-a-box" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/stop-motion-apple" -->
---
<!-- .slide: data-background-color="hsl(0 0% 0%)" data-background-iframe="/demos/scroll-linked-animations/snap-parallax" -->
---
<!-- .slide: data-background-color="var(--citric)" -->
```html []
<body>
  <main>
    <ul class="backdrops">
      <li>
        <img src="backdrop-one.png">
      </li>
      <li>
        <img src="backdrop-two.png">
      </li>
    </ul>  
    <ul class="contents">
      <li>
        <h2>Scroll</h2>
      </li>
      <li>
        <h2>Scroll more</h2>
      </li>
    </ul>
  </main>
</body>
```
---
<!-- .slide: data-background-color="var(--cinnabar)" -->
```css []
.scroller {
  animation-timeline: scroll(root);
  animation: progress both linear;
  animation-delay: cover 0%;
  animation-end-delay: cover 100%;
}
@keyframes progress {
  to {
    transform: rotate(360deg);
  }
}
```
---
<!-- .slide: data-background-color="var(--chateau)" -->
```js []
const TIMELINES = []
// Each content section
TRIGGERS.forEach(subject => {
  TIMELINES.push(new ViewTimeline({
    subject,
    axis: 'block'
  }))
})
// Animate each backdrop
BACKDROPS.forEach((backdrop, index) => {
  const IMG = backdrop.querySelector('img')
  // Entry
  IMG.animate([{
    transform: 'translateY(0%)'
  }
  ], {
    timeline: TIMELINES[index - 1],
    fill: 'both',
    delay: {
      phase: 'exit', 
      percent: CSS.percent(5),
    },
    endDelay: {
      phase: 'exit', 
      percent: CSS.percent(75),
    }
  })
})
```
---
<!-- .slide: class="title-slide title-slide--top" data-background-color="var(--black)" -->
## Think in <span style="color: var(--fuschia)">space</span>.
---
<!-- .slide: data-background-color="hsl(0 0% 0%)" data-background-iframe="/demos/scroll-linked-animations/snap-directions" -->
---
<!-- .slide: data-background-iframe="/demos/scroll-linked-animations/criss-cross" -->
---
<!-- .slide: data-background-color="var(--selective)" -->
```css
.photo:nth-of-type(7n + 1):nth-of-type(even),
.photo:nth-of-type(7n + 3):nth-of-type(even),
.photo:nth-of-type(7n + 5):nth-of-type(even),
.photo:nth-of-type(7n + 7):nth-of-type(even) {
  --vertical: -100%;
  --horizontal: 100%;
}

.photo {
  animation-name: travel;
  animation-fill-mode: both;
  animation-timing-function: linear;
  animation-timeline: --collage;
  animation-delay: enter 100%;
  animation-end-delay: exit 0%;
}

@keyframes travel {
  0% {
    translate: 0 0;
  }
  50% {
    translate: 0 var(--vertical);
  }
  100% {
    translate: var(--horizontal) var(--vertical);
  }
}
```
---
<!-- .slide: data-background-iframe="/demos/scroll-linked-animations/column-parallax" -->
---
<!-- ## Micro interactions
--- -->
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/search-micro" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/avatar-micro" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/scalin-on-main" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/dynamic-island" -->
---
<!-- .slide: data-background-iframe="/demos/scroll-linked-animations/scrolltrigger-book" -->
---
<!-- .slide: data-background-iframe="/demos/scroll-linked-animations/prototype-book" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/chrometober-2022/index.html" -->
---
<!-- .slide: data-background-video="/shared/video/peter.mp4" data-background-video-loop="true" data-background-video-muted="true" data-background-size="contain" data-background-color="var(--spearmint)"-->
---
<!-- .slide: data-background-color="var(--fuschia)" -->
```css []
.blind {
  transform: translate(
    0,
    calc(((-95 * (var(--index, 0))) * 0) * 1%)
  );
  animation: slide both;
  animation-timeline: --trigger;
  animation-delay: enter 0%;
  animation-end-delay: enter 100%;
}

@keyframes slide {
  to {
    transform: translate(
      0,
      calc(((-95 * (var(--index, 0))) * 1) * 1%)
    );
  }
}
```
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/peters-blinds-root" -->
---
<!-- End Section