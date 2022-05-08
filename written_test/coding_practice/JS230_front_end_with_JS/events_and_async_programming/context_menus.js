"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let main = document.querySelector('main');

  main.addEventListener('contextmenu', event => {
    event.preventDefault();
    let elementName = event.target.tagName;

    if (elementName === 'SECTION') {
      alert('sub');
    }

    if (elementName === 'MAIN') {
      alert('main');
    }
  });
});