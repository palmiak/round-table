.slide: data-background-color="var(--blueberry)" class="title-slide title-slide--bottom" -->
## CSS Anchoring
---
<!-- .slide: data-background-color="var(--citric)" -->
<img src="/tpac-2022/assets/tooltip-anatomy.png" />
---
<!-- .slide: data-background-color="var(--off-white)" -->
<div class="code-split">

<div class="code-stack">

```html
<div class="boat"></div>
<div class="anchor"></div>
```

```css
.anchor {
  anchor-name: --anchor;
}

.boat {
  top: anchor(--anchor bottom);
  left: anchor(--anchor right);
}
```
</div>

<iframe class="demo-embed" src="/demos/css-anchoring/basic-boat"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--selective)" -->
<div class="code-split">

<div class="code-stack">

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
}
```
</div>

<iframe class="demo-embed" src="/demos/css-anchoring/fallback-boat"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--fuschia)" -->
<div class="code-split">

<div class="code-stack">

```html
<!-- Caveat -->
<div class="ice-cream-wrapper">
  <div class="ice-creame-cone"></div>
</div>
<div class="ice-cream"></div>
```

```css
.ice-cream-cone {
  anchor-name: --cone;
}
.ice-cream {
  position-fallback: --sundae;
}
@position-fallback --sundae {
  @try {
    bottom: anchor(--cone top);
    left: anchor(--cone center);
  }
  @try {
    bottom: anchor(--floor top);
    left: anchor(--floor center);
  }
}
```
</div>

<iframe class="demo-embed" src="/demos/css-anchoring/fallback-ice-cream"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--fuschia)" -->
<div class="code-split code-split--inverted">

<iframe class="demo-embed" src="/demos/css-anchoring/sushi-charts"></iframe>

<div class="code-stack">

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

</div>
---
<!-- .slide: data-background-color="var(--chateau)" -->
```css
.bear__paw {
  top: anchor(var(--anchor-name) center);
  left: anchor(--form right);
}
#password {
  anchor-name: --password;
}
:root:has(#password:focus) {
  --anchor-name: var(--password)
} 
```
---
<!-- .slide: data-background-iframe="/demos/css-anchoring/bear-form" -->
---
<!-- End Section