// Peter Piper picked a peck of pickled peppers,
// A peck of pickled peppers Peter Piper picked;
// If Peter Piper picked a peck of pickled peppers,
// Where’s the peck of pickled peppers Peter Piper picked?

if (typeof window !== 'undefined') {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  const RECOG = new window.SpeechRecognition()
  RECOG.continuous = true
  RECOG.interimResults = true


  const STATE = {
    RUNNING: false,
  }

  const START = () => {
    if (!STATE.RUNNING) {
      STATE.RUNNING = true
      document.body.style.setProperty('--recording', 1)
      RECOG.start()
    }
  }

  RECOG.onend = () => {
    console.info('Restarting due to error, etc.')
    // Shouldn't end, restart.
    // Only restart if state is still running.
    if (STATE.RUNNING) RECOG.start()
  }
  // Peter Piper picked a peck of pickled peppers,
  // A peck of pickled peppers Peter Piper picked;
  // If Peter Piper picked a peck of pickled peppers,
  // Where’s the peck of pickled peppers Peter Piper picked?
  const PARTICLES = [
    {
      trigger: 'cat',
      emoji: '😹'
    },
    {
      trigger: 'peter',
      emoji: '👷‍♂️'
    },
    {
      trigger: 'picked',
      emoji: '⛏'
    },
    {
      trigger: 'peck',
      emoji: '🐓'
    },
    {
      trigger: 'pickled',
      emoji: '🥒'
    },
    {
      trigger: 'peppers',
      emoji: '🌶'
    },
    {
      trigger: 'lit',
      emoji: '🔥'
    },
    {
      trigger: 'boom',
      emoji: '💣'
    },
    {
      trigger: 'wood',
      emoji: '🌴',
    },
    {
      trigger: 'chuck',
      emoji: '🪓'
    },
    {
      trigger: 'babies',
      emoji: '👶'
    },
    {
      trigger: 'king',
      emoji: '🫄'
    },
    {
      trigger: 'scientist',
      emoji: '💉'
    }
    
  ]

  const EMOJIS = document.querySelector('.emojis')
  const PROCESS_AUDIO = e => {
    const TRANSCRIPT = e.results[e.results.length - 1][0].transcript
      .toLowerCase()
      .trim()
    if (e.results[e.results.length - 1].isFinal === true) {
      for (const WORD of TRANSCRIPT.split(' ')) {
        const PARTICLE = PARTICLES.filter(p => {
          return WORD.indexOf(p.trigger) !== -1
        })[0]
        if (PARTICLE) {
          if (PARTICLE.trigger === 'peter' && document.querySelector('.peter') !== null) return 
          const P = document.createElement('div')
          if (PARTICLE.trigger !== 'king' && PARTICLE.trigger !== 'babies') P.innerText = PARTICLE.emoji
          if (PARTICLE.trigger === 'scientist') P.innerText = '👨🏻‍⚕️'
          P.className = PARTICLE.trigger
          P.dataset.emoji = PARTICLE.emoji
          EMOJIS.appendChild(P)
          if (
            PARTICLE.trigger === 'wood' ||
            PARTICLE.trigger === 'pickled' ||
            PARTICLE.trigger === 'peppers' ||
            PARTICLE.trigger === 'peck' ||
            PARTICLE.trigger === 'chuck'
          ) {
            P.addEventListener('animationend', () => {
              console.info(PARTICLE.trigger)
              P.remove()
            })
          }
          if (PARTICLE.trigger === 'king') {
            P.addEventListener('animationend', () => {
              P.dataset.emoji = '🤴'
            })
          }
          if (PARTICLE.trigger === 'boom') {
            setTimeout(() => EMOJIS.innerHTML = '', 2000)
          }
          P.style.setProperty('--index', EMOJIS.children.length)
        }
      }
      // for (const PARTICLE of PARTICLES) {
      //   if (TRANSCRIPT.indexOf(PARTICLE.trigger) !== -1) {
      //     const P = document.createElement('div')
      //     P.innerText = PARTICLE.emoji
      //     P.className = PARTICLE.trigger
      //     EMOJIS.appendChild(P)
      //     if (PARTICLE.trigger === 'wood' || PARTICLE.trigger === 'chuck') {
      //       P.addEventListener('animationend', () => {
      //         P.remove()
      //       })
      //     }
      //     if (PARTICLE.trigger === 'boom') {
      //       setTimeout(() => EMOJIS.innerHTML = '', 2000)
      //     }
      //     P.style.setProperty('--index', EMOJIS.children.length)
      //   }
      // }
    }
    document.querySelector('main').innerText = TRANSCRIPT
  }

  RECOG.onresult = PROCESS_AUDIO


  START()
}