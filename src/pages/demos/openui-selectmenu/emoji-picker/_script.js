console.clear()

const SELECT = document.querySelector('selectmenu')
const POP = document.querySelector('[popover]')
const BUTTON = SELECT.querySelector('[behavior=button]')
const SELECTED_PLACEHOLDER = BUTTON.querySelector('[data-placeholder]')

const CLONE = () => {
  if (SELECT.dataset.selectedValue) {
    SELECT.dataset.selected = true
    // Grab the option with the value and drop that into the placeholder.
    SELECTED_PLACEHOLDER.innerHTML = `${document.querySelector(`[value=${SELECT.dataset.selectedValue}]`).innerHTML}`
  } else {
    SELECT.dataset.selected = false
    SELECTED_PLACEHOLDER.innerHTML = ''
  }
  // VALUE.innerHTML = `${MENU.value.charAt(0).toUpperCase()}${MENU.value.slice(1)}`
}

const onInput = () => {
  // If you have some input, you need to sync the dataset value too
  SELECT.dataset.selectedValue = SELECT.value
  CLONE()
}

SELECT.addEventListener('input', onInput)

// Intercept the popover being shown.
// If it's a click, then toggle the value.
// If it's a hold, show the options.

const STATE = {
  up: undefined,
  down: undefined,
  type: undefined,
  active: false,
  unlocked: false,
}

const handleDown = e => {
  /* store the type, time, and state */
  if (STATE.active || STATE.unlocked || (e.type === 'keydown' && e.code !== 'Space')) return
  STATE.type = e.type
  STATE.active = true
  STATE.down = Date.now()
  BUTTON.dataset.active = true
}

const handleUp = e => {
  STATE.up = Date.now()
  if (STATE.up - STATE.down < 500) {
    // Do a toggle
    if (!SELECT.dataset.selectedValue) {
      SELECT.dataset.selectedValue = 'heart'
    } else {
      delete SELECT.dataset.selectedValue
    }
    CLONE()
  } else if (STATE.active === true && ((STATE.up - STATE.down) > 500)) {
    // Open the popover
    STATE.unlocked = true
    POP.showPopover()
    const SELECTED = SELECT.querySelector(`[value=${SELECT.value}]`)
    if (SELECTED) SELECTED.focus()
  }
  // Reset the state
  STATE.active = false
  STATE.down = undefined
  STATE.up = undefined
  STATE.type = undefined
  BUTTON.dataset.active = false
}

// BUTTON.addEventListener('pointerdown', handleDown)
POP.addEventListener('beforetoggle', e => {
  if (e.newState === "open") {
    if (!STATE.unlocked) return e.preventDefault()
  } else {
    STATE.unlocked = false
  }
})

BUTTON.addEventListener('keydown', handleDown)
BUTTON.addEventListener('keyup', handleUp)
BUTTON.addEventListener('pointerdown', handleDown)
BUTTON.addEventListener('pointerup', handleUp)