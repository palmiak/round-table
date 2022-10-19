const AUDIO_POP = new Audio("/shared/audio/pop.mp3");
const WORD = "Pop-up";
const START_INDEX = WORD.length / -2 + 0.5;


for (let i = 0; i < 50; i++) {
  const NO_POP = Object.assign(document.createElement('div'), {
    popUp: "manual",
    className: "balloon balloon--floater",
    id: `no-pop--${i}`,
    defaultOpen: true,
    innerHTML: `
        <span class="balloon__content">
        <span class="balloon__handle"></div>
      </span>
    `,
    style: `
      --scale: ${Math.random() + 0.5};
      --left: ${Math.random() * 100};
      --hue: ${Math.random() * 359};
      --float-speed: ${(Math.random() * 10) + 2}s;
      --float-delay: -${Math.random() * 10}s;
    `
  })
  document.body.appendChild(NO_POP)
  NO_POP.showPopUp()
}

for (let p = 0; p < WORD.length; p++) {
  const POPUP = Object.assign(document.createElement("button"), {
    popUp: "manual",
    className: "balloon",
    id: WORD.charAt(p),
    defaultOpen: true,
    title: `Pop "${WORD.charAt(p)}"`,
    innerHTML: `
      <span class="balloon__content">
        <span class="balloon__letter">${WORD.charAt(p)}</span>
        <span class="balloon__handle"></div>
      </span>
    `,
    style: `
      --index: ${START_INDEX + p};
      --hue: ${Math.random() * 359};
      --bob-speed: ${Math.random() + 0.5};
      --float-speed: ${Math.random() + 0.5};
    `
  });
  document.body.appendChild(POPUP);
  POPUP.addEventListener("click", () => {
    AUDIO_POP.currentTime = 0;
    AUDIO_POP.play();
    POPUP.hidePopUp();
    Object.assign(POPUP, {
      style: `
      --index: ${START_INDEX + p};
      --hue: ${Math.random() * 359};
      --bob-speed: ${Math.random() + 0.5};
      --float-speed: ${Math.random() + 0.5};
    `
    });
    requestAnimationFrame(() => POPUP.showPopUp());
  });
  // Because defaultopen does not work for some reason?
  POPUP.showPopUp();
}