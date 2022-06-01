"use strict";

function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  key.classList.add('playing');
}

function removeTransition(event) {
  if (event.propertyName !== 'transform') return;
  event.target.classList.remove('playing');
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('keydown', playSound);
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
});


