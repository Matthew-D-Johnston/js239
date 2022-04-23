"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/api/schedules');
  request.responseType = 'json';
  request.timeout = 5000;

  request.addEventListener('timeout', event => {
    alert('Request timed out: could not retrieve schedules.');
  });

  request.addEventListener('load', event => {
    let schedules = request.response;
    console.log(schedules);
    
    let staffSchedules = {};

    for (let index = 0; index < schedules.length; index += 1) {
      let schedule = schedules[index];
      let staffId = schedule.staff_id;
      let key = `staff ${staffId}`;

      if (staffSchedules[key]) {
        staffSchedules[key] += 1;
      } else {
        staffSchedules[key] = 1;
      }
    }

    let message = '';
    let staffSchedulesKeys = Object.keys(staffSchedules);

    for (let index = 0; index < staffSchedulesKeys.length; index += 1) {
      let staff = staffSchedulesKeys[index];
      if (index === staffSchedulesKeys.length - 1) {
        message += `and ${staff} has ${staffSchedules[staff]} schedules.`;
      } else if (index === 0) {
        message += `${staff.replace('s', 'S')} has ${staffSchedules[staff]} schedules; `;
      } else {
        message += `${staff} has ${staffSchedules[staff]} schedules; `;
      }
    }

    alert(message);
  });

  request.addEventListener('loadend', event => {
    alert('Request completed.');
  });

  request.send();
});