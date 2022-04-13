"use strict";

function generationsToBody(el) {
  let counter = 0;
  while (el.tagName !== 'BODY') {
    el = el.parentElement;
    counter += 1;
  }

  return counter;
}

function walkTheDom(element, generation, callback) {
  if (callback(element) === generation) {
    element.classList.toggle('generation-color');
  }

  for (let index = 0; index < element.children.length; index += 1) {
    walkTheDom(element.children[index], generation, callback);
  }
}

function colorGeneration(generation) {
  let element = document.getElementById('1');
  walkTheDom(element, generation, generationsToBody);
}

document.addEventListener('DOMContentLoaded', () => {
  colorGeneration(0);
});
