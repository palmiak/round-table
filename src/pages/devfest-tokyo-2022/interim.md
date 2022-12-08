 <!-- .slide: class="title-slide title-slide--top" data-background-color="var(--selective)" -->
## We can now anchor our dropdown to our button! 🎉
---
<!-- .slide: data-background-color="var(--fuschia)" -->
<div class="code-split">

<div class="code-stack">


```html
<button>Select Font Size</button>
<div role=listbox>
  <option value=normal>Normal</option>
  <option value=title>Title</option>
  <option value=subtitle>Subtitle</option>
  <option value=footnote>Title</option>
</div>
```

```css
/* Give visual context to our <select> */
[value=title] { font-size: 2rem; }
[value=normal] { font-size: 1rem; }
```

</div>

<iframe class="demo-embed" src="/demos/openui-selectmenu/the-components"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--blueberry)" -->
<div class="code-split">

<div class="code-stack">


```html
<button>Select Font Size</button>
<div role=listbox>
  <option value=normal>Normal</option>
  <option value=title>Title</option>
  <option value=subtitle>Subtitle</option>
  <option value=footnote>Title</option>
</div>
```

```css
button {
  anchor-name: --selectmenu;
}
[role=listbox] {
  position: absolute;
  top: anchor(--selectmenu bottom);
  left: anchor(--selectmenu left);
}
```

</div>

<iframe class="demo-embed" src="/demos/openui-selectmenu/tethering"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--selective)" -->
<div class="code-split">

<div class="code-stack">


## Uh oh.<br>Wrapping elements<br>aren't the problem.

</div>

<iframe class="demo-embed" src="/demos/openui-selectmenu/rudimentary-tethering-issue"></iframe>

</div>
---
<!-- End Section
