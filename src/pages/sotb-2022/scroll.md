<!-- .slide: data-background-video="/shared/video/doom-scroll.mp4" data-background-video-loop="true" data-background-video-muted="true" data-background-video-size="cover" -->
---
<!-- .slide: class="title-slide title-slide--bottom" data-background-color="var(--citric)"-->
<!-- If you want to do everything in Canary with the polyfill -->
<!-- open -a /Applications/Google\ Chrome\ Canary.app --args --disable-blink-features=CSSScrollTimeline,ScrollTimeline -->
## Scroll Linked Animations
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/column-parallax" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/snap-parallax-root" -->
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
```css [|3,8,21]
/* ViewTimeline */
section {
  view-timeline-name: --section;
}
img {
  transform: translateY(100%);
  animation: parallax both linear;
  animation-timeline: --section;
  /* Likely to change */
  animation-delay: exit 5%;
  animation-end-delay: exit 75%;
}
@keyframes parallax {
  to {
    transform: translateY(0%);
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
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/fast-and-scrolly" -->
---
<!-- .slide: class="title-slide title-slide--left" data-background-color="var(--blueberry)" -->
## Let's Make an<br>Image reveal!
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/image-reveals" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/this-is-a-box" -->
---
<!-- .slide: data-background-color="hsl(0 0% 0%)" data-background-iframe="/demos/scroll-linked-animations/snap-directions-root" -->
---
<!-- ## Micro interactions
--- -->
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/search-micro" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/avatar-micro" -->
---
<!-- .slide: data-background-iframe="/demos/scroll-linked-animations/prototype-book" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/chrometober-2022/index.html" -->
---
<!-- .slide: data-background-video="/shared/video/peter.mp4" data-background-video-loop="true" data-background-video-muted="true" data-background-size="contain" data-background-color="var(--spearmint)"-->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/scroll-linked-animations/peters-blinds-root" -->
---
<!-- End Section