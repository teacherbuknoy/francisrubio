/* ANIMATION FOR SVG DISPLACEMENT MAP (see src/templates/components/effects/glitch.njk) */
import anime from "animejs";

const DISTORT_DURATION = 1000;
// Animate baseFrequency of feTurbulence with random values

function getRandomValue() {
  // generate random values for baseFrequency both positive and negative
  return Math.random() * 0.05;
}

function getMultiplier() {
  const random = Math.random();
  return random > 0.5 ? random : random * -1;
}

anime({
  targets: '#distort feTurbulence:nth-child(1)',
  baseFrequency: [
    { value: () => [getRandomValue(), getRandomValue()], duration: DISTORT_DURATION },
    { value: () => [getRandomValue(), getRandomValue()], duration: DISTORT_DURATION }
  ],
  loop: true,
  easing: 'easeInOutSine'
});

anime({
  targets: '#image-distort feTurbulence:nth-child(1)',
  baseFrequency: [
    { value: () => [getRandomValue() + getRandomValue(), getRandomValue()], duration: DISTORT_DURATION * 5 },
    { value: () => [getRandomValue(), getRandomValue() + getRandomValue()], duration: DISTORT_DURATION * 5 }
  ],
  loop: true,
  easing: 'easeInOutSine'
});

