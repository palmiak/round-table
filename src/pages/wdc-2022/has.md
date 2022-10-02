<!--  -->
## CSS :has
---
<div class="support-grid">
  <span class="browser-logo" data-browser="chrome"></span>
  <span class="browser-logo" data-browser="edge"></span>
  <span class="browser-logo" data-browser="safari"></span>
  <span class="browser-logo" data-browser="firefox"></span>
  <span class="browser-version" data-supported>105</span>
  <span class="browser-version" data-supported>105</span>
  <span class="browser-version" data-supported>15.4</span>
  <span class="browser-version">
    <span class="material-symbols-outlined">
      flag
    </span>
  </span>
</div>
---
# 👨‍👩
---
<h1 class="family" style="font-size:10rem;">👨‍👩‍👧‍👦</h1>
---
```css
.everybody:has(.a-good-time) {
  animation: party-like-its 1999s forwards;
}

.jeff:has(~ .aunt) {
  animation: visit 10000s;
}
```
```html
<!-- Selected! ✅-->
<div class="everybody">
  <div class="body body--at-web-dev-conf">
    <div class="a-good-time"></div>
  </div>
</div>

<!-- Not Selected ❌-->
<div class="everybody"></div>

<!-- Selected! ✅-->
<div class="jeff"></div>
<div class="some-distance"></div>
<div class="aunt"></div>
```
---
```css
<target>:has(<condition>) { <styles> }
```
---
## Break the mental model <span class="flipper">🛹</span>
---
Cards
---
Stateful changes (Nav, Toggle)
---
Interaction
---
Games
---
<!-- End Section -->