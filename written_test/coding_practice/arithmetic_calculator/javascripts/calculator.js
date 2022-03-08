"use strict";

// Vanilla JavaScript

// document.addEventListener('DOMContentLoaded', () => {
//   let form = document.querySelector('form');

//   form.addEventListener('submit', function(event) {
//     event.preventDefault();

//     let formData = new FormData(form);
//     let firstNumber = Number(formData.get('first-number'));
//     let secondNumber = Number(formData.get('second-number'));
//     let operator = formData.get('operator');

//     let result = document.getElementById('result');

//     switch(operator) {
//       case '+':
//         result.innerHTML = firstNumber + secondNumber;
//         break;
//       case '-':
//         result.innerHTML = firstNumber - secondNumber;
//         break;
//       case '*':
//         result.innerHTML = firstNumber * secondNumber;
//         break;
//       case '/':
//         result.innerHTML = firstNumber / secondNumber;
//         break;
//     }
//   });
// });

// jQuery
$(function() {
  let $form = $('form');
  
  $form.on('submit', function(event) {
    event.preventDefault();
    
    let formData = $form.serializeArray();
    let firstNumber = Number(formData[0].value);
    let secondNumber = Number(formData[2].value);
    let operator = formData[1].value;

    let $result = $('#result');

    switch(operator) {
      case '+':
        $result.html(firstNumber + secondNumber);
        break;
      case '-':
        $result.html(firstNumber - secondNumber);
        break;
      case '*':
        $result.html(firstNumber * secondNumber);
        break;
      case '/':
        $result.html(firstNumber / secondNumber);
        break;
    }
  });
});
