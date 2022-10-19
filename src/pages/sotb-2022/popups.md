<!-- .slide: data-background-video="/shared/video/pop-up-stack.mp4" data-background-video-loop="true" data-background-video-muted="true" data-background-video-size="cover" -->
---
<!-- .slide: class="title-slide title-slide--top" data-background-color="var(--spearmint)" -->

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
<!-- .slide: class="title-slide title-slide--top" data-background-color="var(--black)" -->
## The goal of the <span style="color: var(--citric);">Open UI</span> initiative is to make it <span style="color: var(--blueberry)">easier</span> for developers to make <span style="color: var(--fuschia);">great user experiences</span>
---
<!-- .slide: class="title-slide title-slide--bottom" data-background-image="/shared/images/king.jpg" data-background-opacity="0.4" -->
## What's the top layer? A place outside of the <span style="background-color: var(--cinnabar);">document</span> flow. A place where <span style="background-color: var(--chateau);">z-index</span> has no effect. Where every element has a styleable <span style="background-color: var(--selective);">::backdrop</span>.
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
<!-- .slide: data-background-color="var(--white)" data-background-iframe="/demos/openui-pop-ups/nav-drawer" -->
---
<!-- .slide: data-background-color="var(--citric)" -->
```css [|17, 18, 19]
[popup] {
  left: 100%;
  width: var(--nav-width);
  transition: transform 0.2s;
  transform: translateX(calc(var(--open, 0) * -100%));
}

[popup]::backdrop {
  transition: opacity 0.2s;
  opacity: var(--open, 0);
}

[popup]:open,
[popup]:open::backdrop {
  --open: 1;
}
body:has([popup]:open) {
  transform: translateX(calc(var(--nav-width) * -1));
}
```
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/webcam-throw" -->
---
<!-- .slide: style="--code-size: 0.325em;" data-background-color="var(--spearmint)" -->
```html []
<button
  popup="manual"
  defaultopen
  popuptoggletarget="menu"
>
  <i class="material-icons">add</i>
</button>
<div id="menu" class="fab__menu" popup="auto" style="--count: 3">
  <ul class="fab__menu-items">
    <li class="fab__menu-item">
      <button
        autofocus
        class="fab"
        style="--index: 0"
        popuphidetarget="menu"
      >
        <i class="material-icons">chat</i>
      </button>
    </li>
    <li class="fab__menu-item">
      <button
        class="fab"
        style="--index: 1"
        popuphidetarget="menu"
      >
        <i class="material-icons">photo_camera</i>
      </button>
    </li>
    <li class="fab__menu-item">
      <button
        class="fab"
        style="--index: 2"
        popuphidetarget="menu"
      >
        <i class="material-icons">pin_drop</i>
      </button>
    </li>
  </ul>
</div>
```
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/poppers-outro" -->
---
<!-- .slide: data-background-color="hsl(0 0% 100%)" data-background-iframe="/demos/openui-pop-ups/error-heaven" -->
---
<!-- End Section