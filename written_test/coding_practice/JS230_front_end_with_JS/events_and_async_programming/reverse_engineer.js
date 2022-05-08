"use strict";

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('html').addEventListener('click', () => {
    document.querySelector('#container').style = 'display: none';
  }, true);
  
  document.querySelector('#container').addEventListener('click', event => {
    // event.stopPropagation();
    document.querySelector('#container').style = 'display: visible';
  });
});


// LS solution

document.querySelector('html').addEventListener('click', (event) => {
  const container = document.querySelector('#container');

  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});
