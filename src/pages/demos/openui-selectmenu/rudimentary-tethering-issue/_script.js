console.clear()

const SELECT = document.querySelector('selectmenu')
const POP = document.querySelector('[popover]')
const BUTTON = SELECT.querySelector('button')

BUTTON.addEventListener('click', () => {
  POP.showPopover()
  SELECT.querySelector(`[value=${SELECT.value}]`).focus()
})

const CITIES = [
  'Tokyo',
  'Kyoto',
  'Osaka',
  'Yokohama',
  'Kobe',
  'Sapporo',
  'Fukuoka',
  'Nagoya',
  'Hiroshima',
]

CITIES.sort((a, b) => a.localeCompare(b)).map((city, index) => {
  const OPTION = Object.assign(document.createElement('option'), {
    value: city,
    innerHTML: `<span>${city}</span>`,
    style: `--index: ${index + 2};`,
  })
  POP.appendChild(OPTION)
})

SELECT.style.setProperty('--count', CITIES.length + 1)