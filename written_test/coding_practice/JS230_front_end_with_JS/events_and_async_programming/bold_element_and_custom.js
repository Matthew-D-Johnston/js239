"use strict";

function makeBold(elem, optionalFunc) {
  elem.style.fontWeight = 'bold';
  optionalFunc(elem);
}

document.addEventListener('DOMContentLoaded', () => {
  let sectionElement = document.querySelector('section');

  console.log(sectionElement.classList.contains('highlight'));
  console.log(sectionElement.style.fontWeight);

  setTimeout(() => {
    makeBold(sectionElement, function(elem) {
      elem.classList.add('highlight');
    })

    console.log(sectionElement.classList.contains('highlight'));
    console.log(sectionElement.style.fontWeight);

  }, 2000);
});
