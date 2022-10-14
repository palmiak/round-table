import "../../../../../public/shared/scripts/scroll-timeline.js";

const BOX = document.querySelector('.box')
const INTRO = document.querySelector('.intro')
const CREDIT = document.querySelector('.credit')
const SECTIONS = [...document.querySelectorAll('section')]
const TIMELINES = []
SECTIONS.forEach(subject => {
  TIMELINES.push(new ViewTimeline({
    subject,
    axis: 'block'
  }))
})

BOX.animate({
  transform: 'translate(50%, -50%)'
}, {
  fill: 'both',
  timeline: TIMELINES[1],
  delay: {
    phase: 'exit', 
    percent: CSS.percent(0),
  },
  endDelay: {
    phase: 'exit', 
    percent: CSS.percent(100),
  }
})
BOX.animate({
  transform: 'translate(-150%, -50%)',
  backgroundColor: 'purple',
}, {
  fill: 'both',
  timeline: TIMELINES[2],
  delay: {
    phase: 'exit', 
    percent: CSS.percent(0),
  },
  endDelay: {
    phase: 'exit', 
    percent: CSS.percent(100),
  }
})
BOX.animate({
  transform: 'translate(50%, -50%)',
  borderRadius: '50%',
}, {
  fill: 'both',
  timeline: TIMELINES[3],
  delay: {
    phase: 'exit', 
    percent: CSS.percent(0),
  },
  endDelay: {
    phase: 'exit', 
    percent: CSS.percent(100),
  }
})
BOX.animate({
  transform: 'translate(-50%, -50%)',
  borderRadius: '0%',
  backgroundColor: 'red',
}, {
  fill: 'both',
  timeline: TIMELINES[4],
  delay: {
    phase: 'exit', 
    percent: CSS.percent(0),
  },
  endDelay: {
    phase: 'exit', 
    percent: CSS.percent(100),
  }
})

INTRO.animate({
  clipPath: 'inset(0 0 0 0)',
}, {
  fill: 'both',
  timeline: TIMELINES[0],
  delay: {
    phase: 'exit', 
    percent: CSS.percent(0),
  },
  endDelay: {
    phase: 'exit', 
    percent: CSS.percent(100),
  }
})
INTRO.animate({
  clipPath: 'inset(0 0 0 100%)',
}, {
  fill: 'both',
  timeline: TIMELINES[1],
  delay: {
    phase: 'exit', 
    percent: CSS.percent(0),
  },
  endDelay: {
    phase: 'exit', 
    percent: CSS.percent(100),
  }
})
CREDIT.animate({
  clipPath: 'inset(0 0 0 0)',
}, {
  fill: 'both',
  timeline: TIMELINES[6],
  delay: {
    phase: 'enter', 
    percent: CSS.percent(0),
  },
  endDelay: {
    phase: 'enter', 
    percent: CSS.percent(100),
  }
})