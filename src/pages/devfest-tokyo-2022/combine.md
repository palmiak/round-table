 <!-- .slide: class="title-slide title-slide--top" data-background-color="var(--off-white)" -->
## Now we can anchor our dropdown and get it above everything else! ✨
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


```html [2,3]
<div class=selectmenu>
  <button popovertoggletarget=menu>Select Font Size</button>
  <div id=menu role=listbox popover>
    <option value=normal>Normal</option>
    <option value=title>Title</option>
    <option value=subtitle>Subtitle</option>
    <option value=footnote>Title</option>
  </div>
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

<iframe class="demo-embed" src="/demos/openui-selectmenu/combining"></iframe>

</div>
---
<!-- .slide: data-background-color="var(--citric)" -->
<div class="code-split">

<div class="code-stack">


## It works! 🙌

</div>

<iframe class="demo-embed" src="/demos/openui-selectmenu/no-issues"></iframe>

</div>
---
<!-- End Section
