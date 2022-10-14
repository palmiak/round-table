const POPUP = document.querySelector("[popup]");

POPUP.addEventListener(
  "show",
  () => (POPUP.innerHTML = "<del>Not</del> In top layer")
);
POPUP.addEventListener("popuphide", () => (POPUP.innerHTML = "Not in top layer"));
