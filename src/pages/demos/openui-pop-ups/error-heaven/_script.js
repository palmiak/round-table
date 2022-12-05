const DING = new Audio('/shared/audio/windows-xp-error-noise.mp3')

const ERRORS = [
  'Impersonated Elon',
  'HTML.dll not found',
  '/System32/Libs/Languages/HTML not found',
  'Uncaught TypeError: cant convert null to object',
  'Have you tried React?',
  'Insufficient RAM, please close Slack',
  'Maximum call stack size exceeded',
  'Cannot get property foo of undefined',
  'FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory',
]

const generateError = id => {
  const newError = Object.assign(document.createElement('div'), {
    id: `pop-${id}`,
    defaultOpen: true,
    popover: 'manual',
    style: `--x: ${Math.random() * window.innerWidth}; --y: ${Math.random() * window.innerHeight}`,
    innerHTML: `
      <div class="window">
        <div class="title-bar">
          <div class="title-bar-text">Error</div>
          <div class="title-bar-controls">
            <button aria-label="Close" popoverhidetarget="pop-${id}"></button>
          </div>
        </div>
        <div class="window-body">
          <div class="content">
            <img src="/shared/images/error.png" alt="">
            <p>
              Error: ${ERRORS[Math.floor(Math.random() * ERRORS.length)]}!
            </p>
          </div>
          <button popoverhidetarget="pop-${id}">Close</button>
        </div>
      </div>
    `
  })
  document.body.appendChild(newError)
  newError.showPopover()
}

let count = 1
const showErrors = () => {
  if (count === 0) count++
  else count += 1
  for (let i = 0; i < count; i++) {
    generateError(Date.now())      
  }
  try {
    DING.pause()
    DING.currentTime = 0
    DING.play()
  }
  catch (err) {
    console.info('can only play once')
  }
}

document.querySelector('[popover]').showPopover()

document.body.addEventListener('popoverhide', showErrors)

// Get that ball rolling
// showErrors()