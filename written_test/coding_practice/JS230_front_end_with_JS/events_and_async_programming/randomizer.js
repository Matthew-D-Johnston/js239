"use strict";

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function callback4() {
  console.log('callback4');
}

function randomizer(...callbacks) {
  let maxTime = (callbacks.length * 2);
  let lastIndex = callbacks.length - 1;
  let timeElapsed = 1;
  let intervalID = setInterval(() => {
    console.log(timeElapsed);
    timeElapsed += 1;
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalID);
  }, maxTime * 1000);

  for (let index = 0; index <= lastIndex; index += 1) {
    let timeLimit = Math.floor(Math.random() * maxTime + 1) * 1000;
    let callback = callbacks[index];
    setTimeout(() => {
      callback();
    }, timeLimit);
  }
}

randomizer(callback1, callback2, callback3, callback4);
