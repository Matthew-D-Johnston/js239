"use strict";

// Vanilla JavaScript

// document.addEventListener('DOMContentLoaded', function() {
//   let form = document.querySelector('form');
//   let list = document.getElementById('grocery-list');

//   form.addEventListener('submit', function(event) {
//     event.preventDefault();

//     let formData = new FormData(form);
//     let itemName = formData.get('name');
//     let quantity = formData.get('quantity');

//     let listItem = document.createElement('li');
//     if (!quantity) {
//       quantity = '1';
//     }

//     listItem.innerHTML = quantity + ' ' + itemName;
//     list.appendChild(listItem);

//     form.reset();
//   });
// });


// jQuery

$(function() {
  let $form = $('form');
  let $list = $('ul');

  $form.on('submit', function(event) {
    event.preventDefault();

    let formData = $form.serializeArray();

    let itemName = formData[0].value;
    let quantity = formData[1].value;

    if (!quantity) {
      quantity = '1';
    }

    let $listItem = $('<li></li>');
    $listItem.html(quantity + ' ' + itemName);
    $list.append($listItem);

    $form[0].reset();
  });
});
