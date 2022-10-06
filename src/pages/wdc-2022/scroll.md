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
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/image-reveals" -->
---
<!-- .slide: data-background-color="var(--spearmint)" -->
```html []
<html>
  <head>
    <title>Scroll Linked Image Reveals</title>
  </head>
  <body>
    <ul>
      <li>
        <h1>Scroll 👇</h1>
      </li>
      <li>
        <img src="/shared/images/starry-night.jpeg">
      </li>
      <li>
        <img src="/shared/images/night-mountain.jpeg">
      </li>
    </ul>
  </body>
</html>
```
---
<!-- .slide: data-background-color="var(--blueberry)" -->
```css [|2,3,7,8,9,10]
li {
  view-timeline-name: curtain;
  view-timeline-axis: block;
}

li img {
  animation: curtains both linear;
  animation-timeline: curtain;
  animation-delay: cover 30%;
  animation-end-delay: cover 50%;
  mask: linear-gradient(45deg, transparent 50%, black 50%);
  mask-repeat: no-repeat;
  mask-size: 200% 200%;
  mask-position: -100% 0;
}

@keyframes curtains {
  to {
    mask-position: 100% 0;
  }
}

```
---
<!-- .slide: data-background-color="var(--selective)" -->
```js [|1-6,15,17-24]
const TIMELINE = new ViewTimeline({
  // Thing you're tracking in the viewport
  subject: LI,
  // Vertical or Horizontal
  axis: 'block' || 'inline'
})
// WAAPI Support
IMG.animate(
  [
    {
      maskPosition: '100% 0'
    }
  ],
  {
    timeline: TIMELINE,
    fill: 'both',
    delay: {
      phase: 'cover' || 'exit' || 'enter' || 'contain', 
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
<!-- .slide: data-background-color="hsl(0 0% 0%)" data-background-iframe="/demos/scroll-linked-animations/fast-and-scrolly" -->
---
<!-- .slide: data-background-color="hsl(0 0% 0%)" data-background-iframe="/demos/scroll-linked-animations/dj-deck" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/this-is-a-box" -->
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
  animation-timeline: --main; /* scroll() (Soon) */
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
<!-- ## Micro interactions
--- -->
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/search-micro" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/avatar-micro" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/dynamic-island" -->
---
<!-- .slide: data-background-video="/shared/video/peter.mp4" data-background-video-loop="true" data-background-video-muted="true" data-background-size="contain" data-background-color="var(--spearmint)"-->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/peters-blinds" -->
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
<!-- ---
## Sneaker Carousel -->
---
<!-- .slide: data-background-iframe="/demos/scroll-linked-animations/scrolltrigger-book" -->
---
<!-- .slide: data-background-iframe="/demos/scroll-linked-animations/prototype-book" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/chrometober-2022/index.html" -->
---
<!-- End Section