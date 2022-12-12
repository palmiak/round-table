const MENU = document.querySelector('selectmenu')
const VALUE = MENU.querySelector('[slot=selected-value]')
const IMG = MENU.querySelector('[role=selected-img]')

const IMG_MAP = {
  'cucumber-maki': '/shared/images/sushi/cucumber-maki--selected.svg',
  'tuna-maki': '/shared/images/sushi/tuna-maki--selected.svg',
  'salmon-maki': '/shared/images/sushi/salmon-maki--selected.svg',
  'salmon-nigiri': '/shared/images/sushi/salmon-nigiri--selected.svg',
  'tuna-nigiri': '/shared/images/sushi/tuna-nigiri--selected.svg',
  'egg-nigiri': '/shared/images/sushi/egg-nigiri--selected.svg',
}

const CLONE = () => {
  IMG.src = IMG_MAP[MENU.value]
}

MENU.addEventListener('input', CLONE)
CLONE()