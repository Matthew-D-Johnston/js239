"use strict";

function sliceTree(startId, endId) {
  let results = [];
  let currentElement = document.getElementById(String(endId));
  
  if (currentElement) {
    results.push(currentElement.tagName);

    do {
      currentElement = currentElement.parentElement;
      results.push(currentElement.tagName);
  
      if (currentElement.id === String(startId)) { 
        return results.reverse(); 
      };
    } while (currentElement.parentElement.tagName !== 'BODY');
  }

  return undefined;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(sliceTree(1, 4));
  console.log(sliceTree(1, 76));
  console.log(sliceTree(2, 5));
  console.log(sliceTree(5, 4));
  console.log(sliceTree(1, 23));
  console.log(sliceTree(1, 22));
  console.log(sliceTree(11, 19));
});
