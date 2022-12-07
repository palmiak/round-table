const INPUTS = document.querySelectorAll("input");
const POP = new Audio(
  new URL('/shared/audio/pop.mp3', import.meta.url)
)

const update = e => {
  const BAR = document.querySelector(
    `#${e.target.getAttribute("data-bar-id")}`
  )
  if (e.target.shockTimer) clearTimeout(e.target.shockTimer)
  e.target.shockTimer = setTimeout(() => BAR.className = 'chart__bar', 500)
  BAR.className = 'chart__bar chart__bar--active'
  BAR.style.height = `${e.target.value}%`;
};

const BARS = [...document.querySelectorAll('.chart__bar')]

INPUTS.forEach((input, index) => {
  input.addEventListener("input", update);
  input.addEventListener("change", () => {
    POP.pause()
    POP.currentTime = 0
    POP.play()
  })
});
