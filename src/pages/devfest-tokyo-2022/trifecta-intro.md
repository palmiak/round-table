 <!-- .slide: class="title-slide title-slide--top" data-background-color="var(--chateau)" -->
## It's 2022 and you still can't style a <select class="inline-select"><option>Select</option><option>Style Me?</option><option>Please!</option></select>. We're going to change that.
---
<!-- .slide: data-background-color="var(--spearmint)" -->
<div class="code-split">

<div class="code-stack">


```html
<select name=font-size id=size>
  <option value=normal>Normal</option>
  <option value=title>Title</option>
  <option value=subtitle>Subtitle</option>
  <option value=footnote>Title</option>
</select>
```

```css
/* Give visual context to our <select> */
[value=title] { font-size: 2rem; }
[value=normal] { font-size: 1rem; }
```

</div>

<iframe class="demo-embed" src="/demos/openui-selectmenu/attempting-select"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--cinnabar)" -->
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


```html [1,9]
<div class=selectmenu>
  <button>Select Font Size</button>
  <div role=listbox>
    <option value=normal>Normal</option>
    <option value=title>Title</option>
    <option value=subtitle>Subtitle</option>
    <option value=footnote>Title</option>
  </div>
</div>
```

```css
/* Give visual context to our <select> */
.selectmenu {
  position: relative;
}
[role=listbox] {
  position: absolute;
  top: 100%;
  left: 0;
}
```

</div>

<iframe class="demo-embed" src="/demos/openui-selectmenu/anchoring-attempt"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--selective)" -->
<div class="code-split">

<div class="code-stack">


## Uh oh

</div>

<iframe class="demo-embed" src="/demos/openui-selectmenu/rudimentary-anchoring-issue"></iframe>

</div>
---
<!-- End Section
