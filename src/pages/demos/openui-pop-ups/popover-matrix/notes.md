# Matrix Rain Notes

## Tools for the job
- GSAP
- HTML canvas

## Planning
Start by planning out the Objects. You know each stream/stack could be it's own canvas that gets drawn onto the main canvas.
Think about the glyphs and how that could be wrapped (Array.at). You only care about making the font stack and the glyphs change. Then you change the "y" position of the stack over time with a stepped timing function. Ideally matching the height of a glyph (Might need to repeat the animation until it's out of position, then kill it.)

Kick off the loop and render one stack first to see how it works.

## Creating a stack