const AUDIO_POP = new Audio("/shared/audio/pop.mp3");
const WORD = "Popover";
const START_INDEX = WORD.length / -2 + 0.5;

for (let p = 0; p < WORD.length; p++) {
  const POPUP = Object.assign(document.createElement("button"), {
    popover: "manual",
    className: "balloon",
    id: WORD.charAt(p),
    defaultOpen: true,
    title: `Pop "${WORD.charAt(p)}"`,
    innerHTML: `
      <div class="balloon__text">${WORD.charAt(p)}</div> 
      <svg class="balloon__body" viewBox="0 0 130 290" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_7_209)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M40 10H20V20H10V30H0L3.93402e-06 120H10L10 130H20V140H30V150H40V160H50V170H60L60 290H70L70 170H80V160H90V150H100V140H110V130H120V120H130V30H120V20H110V10H90V0H40V10ZM40 10H90V20H110V30H120V120H110V130H100V140H90V150H80V160H70V170H60V160H50V150H40V140H30V130H20V120H10L10 30H20V20L40 20V10Z" fill="black"/>
          <path class="balloon__rubber" d="M40 10H90V20H111V30H120V120H111V130H100V140H90V150H80V160H70V170H80V180H50V170H60V160H50V150H40V140H30V130H20V120H10V30H20V20H40V10Z" fill="#FF1E1E"/>
          <path d="M30 40H40V30H30V40Z" fill="white"/>
          <path d="M30 40V70H20V40H30Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="clip0_7_209">
            <rect width="130" height="290" fill="white"/>
          </clipPath>
        </defs>
      </svg>
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
    POPUP.hidePopover();
    Object.assign(POPUP, {
      style: `
      --index: ${START_INDEX + p};
      --hue: ${Math.random() * 359};
      --bob-speed: ${Math.random() + 0.5};
      --float-speed: ${Math.random() + 0.5};
    `
    });
    requestAnimationFrame(() => POPUP.showPopover());
  });
  // Because defaultopen does not work for some reason?
  POPUP.showPopover();
}
