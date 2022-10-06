const DING = new Audio('/shared/audio/windows-xp-error-noise.mp3')

const ERRORS = [
  'HTML.dll not found',
  '/System32/Libs/Languages/HTML not found',
  'Tailwind class usage beneath requirement',
  'Have you tried React?'
]

const generateError = id => {
  const newError = Object.assign(document.createElement('div'), {
    id: `pop-${id}`,
    defaultOpen: true,
    popUp: 'manual',
    style: `--x: ${Math.random() * window.innerWidth}; --y: ${Math.random() * window.innerHeight}`,
    innerHTML: `
      <div class="window">
        <div class="title-bar">
          <div class="title-bar-text">Error</div>
          <div class="title-bar-controls">
            <button aria-label="Close" popuphidetarget="pop-${id}"></button>
          </div>
        </div>
        <div class="window-body">
          <div class="content">
            <img src="/shared/images/error.png" alt="">
            <p>
              Error: ${ERRORS[Math.floor(Math.random() * ERRORS.length)]}!
            </p>
          </div>
          <button popuphidetarget="pop-${id}">Close</button>
        </div>
      </div>
    `
  })
  document.body.appendChild(newError)
  newError.showPopUp()
}

let count = 0
const showErrors = () => {
  if (count === 0) count++
  else count += 1
  for (let i = 0; i < count; i++) {
    DING.pause()
    DING.currentTime = 0
    DING.play()
    generateError(Date.now())
  }
}

document.body.addEventListener('hide', showErrors)

// Get that ball rolling
setTimeout(() => showErrors(), 2000)