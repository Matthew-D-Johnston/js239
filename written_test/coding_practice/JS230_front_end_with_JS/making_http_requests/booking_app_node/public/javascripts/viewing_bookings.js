"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let datesList = document.querySelector('ul.dates');

  let datesRequest = new XMLHttpRequest();
  datesRequest.open('GET', 'http://localhost:3000/api/bookings');
  datesRequest.responseType = 'json';

  datesRequest.addEventListener('load', event => {
    let dates = datesRequest.response;
    
    for (let index = 0; index < dates.length; index += 1) {
      let dateListElement = document.createElement('li');
      dateListElement.textContent = dates[index];
      datesList.appendChild(dateListElement);
    }
  });

  datesList.addEventListener('click', event => {
    let dateListElement = event.target;
    let date = dateListElement.innerText;
    let schedulesList = document.createElement('ul');

    let schedulesRequest = new XMLHttpRequest();
    schedulesRequest.open('GET', `http://localhost:3000/api/bookings/${date}`);
    schedulesRequest.responseType = 'json';

    schedulesRequest.addEventListener('load', event => {
      let schedules = schedulesRequest.response;

      for (let idx = 0; idx < schedules.length; idx += 1) {
        let schedule = schedules[idx];
        let name = schedule[0];
        let email = schedule[1];
        let time = schedule[2];
        let scheduleText = `${name} | ${email} | ${time}`;
        let scheduleListItem = document.createElement('li');
        scheduleListItem.innerText = scheduleText;
        schedulesList.appendChild(scheduleListItem);
      }

      dateListElement.appendChild(schedulesList);
    });

    schedulesRequest.send();
  });

  datesRequest.send();
});
