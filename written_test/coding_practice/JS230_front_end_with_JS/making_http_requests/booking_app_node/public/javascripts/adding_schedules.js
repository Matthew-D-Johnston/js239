"use strict";

let scheduleId = 1;

function createScheduleField() {
  let fieldset = document.createElement('fieldset');
  
  let legend = document.createElement('legend');
  legend.innerText = `Schedule ${scheduleId}`;

  let ul = document.createElement('ul');
  let nameLi = nameListElement();
  let dateLi = dateListElement();
  let timeLi = timeListElement();

  ul.appendChild(nameLi);
  ul.appendChild(dateLi);
  ul.appendChild(timeLi);

  fieldset.appendChild(legend);
  fieldset.appendChild(ul);

  scheduleId += 1;
  return fieldset;
}

function nameListElement() {
  let nameLi = document.createElement('li');
  let nameLabel = document.createElement('label');
  nameLabel.innerText = 'Staff Name:';
  nameLabel.setAttribute('for', `name-${scheduleId}`);
  let nameSelect = document.createElement('select');
  nameSelect.setAttribute('id', `name-${scheduleId}`);
  nameSelect.setAttribute('name', `staff_name-${scheduleId}`);
  createStaffNameOptionElements(nameSelect);
  nameLi.appendChild(nameLabel);
  nameLi.appendChild(nameSelect);
  return nameLi;
}

function dateListElement() {
  let dateLi = document.createElement('li');
  let dateLabel = document.createElement('label');
  dateLabel.innerText = 'Date:';
  dateLabel.setAttribute('for', `date-${scheduleId}`);
  let dateInput = document.createElement('input');
  dateInput.setAttribute('type', 'text');
  dateInput.setAttribute('id', `date-${scheduleId}`);
  dateInput.setAttribute('name', `date-${scheduleId}`);
  dateInput.setAttribute('placeholder', 'mm-dd-yy');
  dateLi.appendChild(dateLabel);
  dateLi.appendChild(dateInput);

  return dateLi;
}

function timeListElement() {
  let timeLi = document.createElement('li');
  let timeLabel = document.createElement('label');
  timeLabel.innerText = 'Time:';
  timeLabel.setAttribute('for', `time-${scheduleId}`);
  let timeInput = document.createElement('input');
  timeInput.setAttribute('type', 'text');
  timeInput.setAttribute('id', `time-${scheduleId}`);
  timeInput.setAttribute('name', `time-${scheduleId}`);
  timeInput.setAttribute('placeholder', 'hh:mm');
  timeLi.appendChild(timeLabel);
  timeLi.appendChild(timeInput);

  return timeLi;
}

function createStaffNameOptionElements(selectElement) {
  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/api/staff_members');
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let staff_members = request.response;

    staff_members.forEach(member => {
      let option = document.createElement('option');
      option.setAttribute('value', `${member.id}`);
      option.innerText = member.name;
      
      selectElement.appendChild(option);
    });
  });

  request.send();
}

function validDate(date) {
  return !!date.match(/\d{2}-\d{2}-\d{2}/g);
}

function validTime(time) {
  return !!time.match(/\d{2}:\d{2}/g);
}

function validFormData(data) {
  let numberOfSchedules = document.querySelectorAll('fieldset').length;

  for (let index = 1; index <= numberOfSchedules; index += 1) {
    let currentDate = data.get(`date-${index}`);
    let currentTime = data.get(`time-${index}`);
    if (!validDate(currentDate) || !validTime(currentTime)) {
      return false;
    }
  }

  return true;
}

function scheduleData(data) {
  let schedules = [];
  let numberOfSchedules = document.querySelectorAll('fieldset').length;

  for (let index = 1; index <= numberOfSchedules; index += 1) {
    let schedule = {};
    schedule['staff_id'] = Number(data.get(`staff_name-${index}`));
    schedule['date'] = data.get(`date-${index}`);
    schedule['time'] = data.get(`time-${index}`);

    schedules.push(schedule);
  }

  return schedules;
}


document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  let submitButton = document.querySelector("input[type=submit]");
  let fieldset = createScheduleField();

  submitButton.insertAdjacentElement('beforebegin', fieldset);

  let addScheduleButton = document.querySelector('button');

  addScheduleButton.addEventListener('click', event => {
    event.preventDefault();

    let additionalFieldset = createScheduleField();
    submitButton.insertAdjacentElement('beforebegin', additionalFieldset);
  });

  submitButton.addEventListener('click', event => {
    event.preventDefault();

    let formData = new FormData(form);

    if (validFormData(formData)) {
      let schedulesObject = {
        schedules: scheduleData(formData)
      }

      let json = JSON.stringify(schedulesObject);
      console.log(json);
      
      let request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:3000/api/schedules');
      request.setRequestHeader('Content-Type', 'application/json');
      
      request.addEventListener('load', event => {
        console.log(request.status);
        if (request.status === 201) {
          alert('Schedules added');
          form.reset();
        }
      });

      request.send(json);
    } else {
      alert('Please check your inputs');
    }
  });
});