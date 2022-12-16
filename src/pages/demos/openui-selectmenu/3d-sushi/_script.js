const MENU = document.querySelector('selectmenu')
const LABEL = MENU.querySelector('.cuboid__value')
const POPOVER = MENU.querySelector('[popover]')


const CLONE = () => {
  LABEL.innerText = MENU.matches('[data-dirty=false') ? 'choose maki' : MENU.value
}

MENU.addEventListener('input', CLONE)
CLONE()

POPOVER.addEventListener('beforetoggle', ({ newState }) => {
  if (newState === "open" && MENU.matches('[data-dirty=false]')) {
    MENU.removeAttribute('data-dirty')
    CLONE()
  }
})