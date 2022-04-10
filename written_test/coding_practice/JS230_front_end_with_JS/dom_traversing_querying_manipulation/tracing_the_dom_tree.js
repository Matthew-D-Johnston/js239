"use strict";

function domTreeTracer(idNumber) {
  let element = document.getElementById(String(idNumber));
  let domTree = [];

  let elementAndSiblings = element.parentElement.children;
  let elementAndSiblingsArray = Array.prototype.slice.call(elementAndSiblings);

  domTree.push(elementAndSiblingsArray.map(el => el.tagName));

  while (element.parentElement.tagName !== 'BODY') {
    element = element.parentElement;
    elementAndSiblings = element.parentElement.children;
    elementAndSiblingsArray = Array.prototype.slice.call(elementAndSiblings);
    domTree.push(elementAndSiblingsArray.map(el => el.tagName));
  }
  
  return domTree;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(domTreeTracer(22));
});
