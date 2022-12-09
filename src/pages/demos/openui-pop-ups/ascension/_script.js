const POPUP = document.querySelector("[popover]");

POPUP.addEventListener("beforetoggle", ({ newState }) => {
  POPUP.innerHTML = newState === "closed" ? "Not in top layer" : "<del>Not</del> In top layer"
});
