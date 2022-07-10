"use strict";

let header = document.querySelector('body > header');
document.body.insertAdjacentElement('afterbegin', header);

let h1 = document.querySelector('main > h1');
header.insertAdjacentElement('afterbegin', h1);

let images = document.querySelectorAll('figure');
for (let index = 1; index >= 0; index -= 1) {
  document.querySelector('article').insertAdjacentElement('beforeend', images[index]);
}
