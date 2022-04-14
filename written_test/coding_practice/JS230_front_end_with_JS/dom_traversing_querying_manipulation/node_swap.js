"use strict";

function isAncestor(node1, node2) {
  let child = node1;

  do {
    if (child.parentNode.id === node2.id) {
      return true;
    }
    child = child.parentNode;
  } while (child.parentNode.id && child.parentNode !== node2.id);

  return false;
}

function nodeSwap(id1, id2) {
  let node1 = document.getElementById(String(id1));
  let node2 = document.getElementById(String(id2));

  if (!node1 || !node2) {
    return undefined;
  }

  if (isAncestor(node1, node2) || isAncestor(node2, node1)) {
    return undefined;
  }

  let clonedNode = node1.cloneNode(true);
  node1.parentNode.insertBefore(clonedNode, node1);
  node2.parentNode.replaceChild(node1, node2);
  clonedNode.parentNode.replaceChild(node2, clonedNode);
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(nodeSwap(1, 20));
  console.log(nodeSwap(1, 4));
  console.log(nodeSwap(9, 3));
  console.log(nodeSwap(3, 1));
  console.log(nodeSwap(7, 9));
});
