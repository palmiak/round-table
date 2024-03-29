<!-- .slide: class="title-slide title-slide--top" data-background-color="var(--spearmint)" -->

<h2>
  <del>It's 2022 and I can't style a &lt;select&gt;?</del>
  <br>
  Open UI SelectMenu
</h2>

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
<!-- .slide: data-background-color="var(--blueberry)" -->

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
[value=title] { font-size: 2rem; }
```

</div>
---
<!-- .slide: data-background-iframe="/demos/openui-selectmenu/attempting-select" data-background-color="var(--spearmint)" -->
---
<!-- .slide: data-background-color="var(--citric)" -->

```html [|1,6]
<selectmenu name=font-size id=size>
  <option value=normal>Normal</option>
  <option value=title>Title</option>
  <option value=subtitle>Subtitle</option>
  <option value=footnote>Title</option>
</selectmenu>
```
---
<!-- .slide: data-background-color="var(--selective)" data-background-iframe="/demos/openui-selectmenu/font-size-select" -->
---
<!-- .slide: data-background-color="var(--fuschia)" -->

```html [|3,4,5,6,7,8,11,12,13,14,15,16|2,9,10,17]
<selectmenu id="country">
  <div slot="button">
    <button behavior="button">
      <span behavior="selected-value" slot="selected-value">
        <span>Japan</span>
        <img src="./jp.png" alt="">
      </span>
    </button>
  </div>
  <div slot=listbox>
    <div popover behavior=listbox>
      <option value=Japan>
        <img src="./jp.png" alt="">
        <span>Japan</span>
      </option>
    </div>
  </div>
</selectmenu>
```
---
<!-- .slide: data-background-iframe="/demos/openui-selectmenu/country-select" data-background-color="var(--blueberry)" -->
---
<!-- .slide: data-background-iframe="/demos/openui-selectmenu/spread-fan-select" data-background-color="var(--off-white)" -->
---
<!-- .slide: data-background-color="var(--citric)" -->

```html [|3,5,6,7,9,10]
<selectmenu>
  <div slot="button">
    <button behavior="button" disabled={loading}>
      <span className="pokeselect__image-placeholder">
        {loading && <img className="pokeselect__ball" src="poke-ball.png" alt="" />}
        {!loading && !selected && <img className="pokeselect__choose" src="question.png" alt="" />} 
        {selected && <img className="pokeselect__avatar" src={selected.avatar} alt=""/>}
      </span>
      {!selected && <span className="pokeselect__placeholder">Select Pokémon</span>} 
      {selected && <span>{selected.name}</span>}
      <svg viewBox="0 0 320 512" title="marker"></svg>
    </button>
  </div>
  <div slot="listbox">
    <div popover="auto" behavior="listbox">
      <!-- Here go the options populated from the Poké API -->
    </div>
  </div>
</selectmenu>
```
---
<!-- .slide: data-background-iframe="/demos/openui-selectmenu/pokeselect" -->
---
<!-- .slide: data-background-iframe="/demos/openui-selectmenu/emoji-picker" -->
---
<!-- .slide: data-background-iframe="/demos/openui-selectmenu/sushi-picker" -->
---
<!-- .slide: data-background-iframe="/demos/openui-selectmenu/3d-sushi" -->
---
<!-- End Section