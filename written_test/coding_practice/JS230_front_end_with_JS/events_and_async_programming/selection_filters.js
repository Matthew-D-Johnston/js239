"use strict";

let classificationOptions = {
  'Classifications': ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Vertebrate': ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  'Mammal': ['Bear', 'Whale'],
  'Bird': ['Ostrich']
}

let animalOptions = {
  'Animals': ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
  'Bear': ['Vertebrate', 'Warm-blooded', 'Mammal'],
  'Turtle': ['Vertebrate', 'Cold-blooded'],
  'Whale': ['Vertebrate', 'Warm-blooded', 'Mammal'],
  'Salmon': ['Vertebrate', 'Cold-blooded'],
  'Ostrich': ['Vertebrate', 'Warm-blooded', 'Bird']
}

function setMenuOptions(type, selection, selectElement) {
  selectElement.innerHTML = '';
  let optionList;

  if (type === 'classification') {
    optionList = classificationOptions[selection];
  }

  if (type === 'animal') {
    optionList = animalOptions[selection];
  }

  optionList.forEach(option => {
    let optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let classifications = document.getElementById('animal-classifications');
  let animals = document.getElementById('animals');
  let clear = document.getElementById('clear');
  let form = document.querySelector('form');

  classifications.addEventListener('input', () => {
    setMenuOptions('classification', classifications.value, animals);
  });

  animals.addEventListener('input', () => {
    setMenuOptions('animal', animals.value, classifications);
  });

  clear.addEventListener('click', event => {
    event.preventDefault();
    setMenuOptions('classification', 'Classifications', animals);
    setMenuOptions('animal', 'Animals', classifications);
  });
});
