const POPUP = document.querySelector("[popover]");

POPUP.addEventListener(
  "popovershow",
  () => (POPUP.innerHTML = "<del>Not</del> In top layer")
);
POPUP.addEventListener("popoverhide", () => (POPUP.innerHTML = "Not in top layer"));
