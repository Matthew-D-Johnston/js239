"use strict";

function nodesToArray() {
  return parentTagAndChildrenArray(document.body);
}

function parentTagAndChildrenArray(node) {
  let children = node.children;
  let parentTagName = node.tagName;
  let result = [];
  result.push(parentTagName);
  result.push([]);

  if (children.length > 0) {
    for (let index = 0; index < children.length; index += 1) {
      result[1].push(parentTagAndChildrenArray(children[index]));
    }
  } else {
    result[1].push([]);
  }
  
  return result;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(nodesToArray());
});