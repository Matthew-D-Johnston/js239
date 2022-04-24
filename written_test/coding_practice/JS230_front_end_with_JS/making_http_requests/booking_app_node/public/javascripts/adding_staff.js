"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    let formData = new FormData(form);
    let data = {
      name: formData.get('staff_name'),
      email: formData.get('staff_email')
    };
    let json = JSON.stringify(data);
    
    console.log(json);

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/api/staff_members');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.timeout = 5000;

    request.addEventListener('load', event => {
      if (request.status === 201) {
        let message = `${data.name} with email address ${data.email} was added to the database.`;
        alert(message);
      }
    });

    request.addEventListener('abort', event => {
      alert('Request was aborted.');
    });

    request.addEventListener('timeout', event => {
      alert('Request timed out.');
    });

    request.addEventListener('error', event => {
      alert('An error occurred with the request.');
    });

    request.addEventListener('loadend', event => {
      alert('Request completed.');
    });

    request.send(json);
  });
});
