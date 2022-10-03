const BUTTON = document.querySelector('.nav-control')

const TOGGLE = () => {
  BUTTON.setAttribute(
    'aria-pressed',
    BUTTON.matches('[aria-pressed="false"]') ? true : false
  )
  BUTTON.setAttribute(
    'aria-expanded',
    BUTTON.matches('[aria-expanded="false"]') ? true : false
  )

}

BUTTON.addEventListener('click', TOGGLE)