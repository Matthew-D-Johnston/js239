"use strict";

let tracker = {
  events: [],
  list: function() {
    let eventsCopy = Array.prototype.slice.call(this.events);
    return eventsCopy;
  },
  elements: function() {
    return this.events.map(event => event.target);
  },
  clear: function() {
    this.events = [];
  }
}


function track(callback) {
  return function(event) {
    if (event.target === event.currentTarget) {
      tracker.events.push(event);
    }
    callback(event);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let divRed = document.getElementById('red');
  let divBlue = document.getElementById('blue');
  let divOrange = document.getElementById('orange');
  let divGreen = document.getElementById('green');

  divRed.addEventListener('click', track(event => {
    document.body.style.background = 'red';
  }));

  divBlue.addEventListener('click', track(event => {
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));

  divOrange.addEventListener('click', track(event => {
    document.body.style.background = 'orange';
  }));

  divGreen.addEventListener('click', track(event => {
    document.body.style.background = 'green';
  }));
});
