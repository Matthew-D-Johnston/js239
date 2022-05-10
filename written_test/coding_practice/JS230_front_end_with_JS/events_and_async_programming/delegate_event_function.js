"use strict";

function delegateEvent(parentElement, selector, eventType, callback) {
  if (!parentElement) {
    return undefined;
  }

  parentElement.addEventListener(eventType, event => {
    let selections = parentElement.querySelectorAll(selector);
    let selectionsArray = Array.prototype.slice.call(selections);

    if (selectionsArray.includes(event.target)) {
      callback(event);
    }
  });

  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const element1 = document.querySelector('table');
  const element2 = document.querySelector('main h1');
  const element3 = document.querySelector('main');

  const callback = ({target, currentTarget}) => {
    alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
  }

  console.log(delegateEvent(element2, 'p', 'click', callback));
});
