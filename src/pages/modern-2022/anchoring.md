.slide: data-background-color="var(--blueberry)" class="title-slide title-slide--bottom" -->
## CSS Anchoring
---
<!-- .slide: data-background-color="var(--citric)" -->
<img src="/tpac-2022/assets/tooltip-anatomy.png" />
---
<!-- .slide: data-background-color="var(--selective)" class="code-grid-with-header" style="--code-size: 0.65rem;"-->

<div style="display:inline-grid; grid-auto-flow:column; align-items:center; align-content:center;">
<div style="display:grid; gap:1rem; align-items:center; align-content:center;">

  ```html
  <!-- Markup obfuscated  -->
  <header style="position: relative;">
    <nav style="position: relative;">
      <span class="nav-links">
        <button id="products-btn">Products</button>
      </span>
      <div popover id="products">
        <button id="css-btn">CSS</button>
      </div>
    </nav>
    <div popover id="css"></div>
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
</div>
---
<!-- .slide: data-background-color="var(--off-white)" -->
<div class="code-split">

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

<iframe style="min-height: 65vh;" class="demo-embed" src="/demos/css-anchoring/anchor-charts"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--fuschia)" -->
<div class="code-split">

<div class="code-stack">

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

<iframe class="demo-embed" src="/demos/css-anchoring/position-fallback-boat"></iframe>

</div>

---
<!-- End Section