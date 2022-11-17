const SELECT = document.querySelector('selectmenu')
const POP = document.querySelector('[popover]')
const BUTTON = SELECT.querySelector('[behavior=button]')
const SELECTED_PLACEHOLDER = BUTTON.querySelector('[data-placeholder]')

const CLONE = () => {
  console.info('cloning', SELECT.dataset.selectedValue)
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
let down
let up

const handleDown = () => {
  down = Date.now()
}

const handleUp = e => {
  up = Date.now()
  if (up - down < 500) {
    e.preventDefault()
    console.info('toggle the like and set the value to heart', SELECT.dataset.selectedValue)
    if (!SELECT.dataset.selectedValue) {
      SELECT.dataset.selectedValue = 'heart'
    } else {
      delete SELECT.dataset.selectedValue
    }
    CLONE()
  } else {
    console.info('open the popover for selection')
  }
}

BUTTON.addEventListener('pointerdown', handleDown)
POP.addEventListener('popovershow', handleUp)