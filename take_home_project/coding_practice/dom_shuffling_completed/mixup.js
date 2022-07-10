"use strict";

let header = document.querySelector('body > header');
document.body.insertAdjacentElement('afterbegin', header);

let h1 = document.querySelector('main > h1');
header.insertAdjacentElement('afterbegin', h1);

let images = document.querySelectorAll('figure');

let babyMopImage = images[0].querySelector('img');
let chinStickImage = images[1].querySelector('img');

images[0].insertAdjacentElement('afterbegin', chinStickImage);
images[1].insertAdjacentElement('afterbegin', babyMopImage);

for (let index = 0; index < images.length; index += 1) {
  document.querySelector('article').insertAdjacentElement('beforeend', images[index]);
}

