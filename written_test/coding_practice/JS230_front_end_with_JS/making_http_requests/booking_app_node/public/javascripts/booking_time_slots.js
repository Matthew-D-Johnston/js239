"use strict";

function retrieveSchedules() {
  let scheduleRequest = new XMLHttpRequest();
  scheduleRequest.open('GET', 'http://localhost:3000/api/schedules/');
  scheduleRequest.responseType = 'json';

  let staffRequest = new XMLHttpRequest()
  staffRequest.open('GET', 'http://localhost:3000/api/staff_members');
  staffRequest.responseType = 'json';

  scheduleRequest.addEventListener('load', event => {
    let scheduleElement = document.querySelector('select');
    let schedules = scheduleRequest.response;

    staffRequest.addEventListener('load', event => {
      let staff = staffRequest.response;

      for (let index = 0; index < schedules.length; index += 1) {
        let option = document.createElement('option');
        option.value = schedules[index].id;
        
        let staffId = schedules[index].staff_id;
        let staffName;
        let date = schedules[index].date;
        let time = schedules[index].time;

        for (let idx = 0; idx < staff.length; idx += 1) {
          if (staff[idx].id === staffId) {
            staffName = staff[idx].name;
          }
        }

        option.innerText = `${staffName} | ${date} | ${time}`;

        scheduleElement.appendChild(option);
      }
    });
    
    staffRequest.send();
  });

  scheduleRequest.send();
}


function newStudentDetailsHTML(email, bookingSequence) {
  let div = document.createElement('div');
  div.classList.add('student-details');
  
  let h1 = document.createElement('h1');
  h1.innerText = 'Please provide new student details';

  let form = document.createElement('form');
  form.classList.add('student');
  
  let ul = document.createElement('ul');

  let emailLi = document.createElement('li');
  let emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'new-email');
  emailLabel.textContent = 'Email:';
  let emailInput = document.createElement('input');
  emailInput.setAttribute('type', 'email');
  emailInput.id = 'new-email';
  emailInput.name = 'new-email';
  emailInput.value = email;
  emailLi.appendChild(emailLabel);
  emailLi.appendChild(emailInput);

  let nameLi = document.createElement('li');
  let nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Name:';
  let nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.id = 'name';
  nameInput.name = 'name';
  nameLi.appendChild(nameLabel);
  nameLi.appendChild(nameInput);

  let bookingSeqLi = document.createElement('li');
  let bookingSeqLabel = document.createElement('label');
  bookingSeqLabel.setAttribute('for', 'booking');
  bookingSeqLabel.textContent = 'Booking Sequence:';
  let bookingSeqInput = document.createElement('input');
  bookingSeqInput.setAttribute('type', 'text');
  bookingSeqInput.id = 'booking';
  bookingSeqInput.name = 'booking';
  bookingSeqInput.value = bookingSequence;
  bookingSeqLi.appendChild(bookingSeqLabel);
  bookingSeqLi.appendChild(bookingSeqInput);

  let submitButton = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  submitButton.value = 'Submit';

  ul.appendChild(emailLi);
  ul.appendChild(nameLi);
  ul.appendChild(bookingSeqLi);

  form.appendChild(ul);
  form.appendChild(submitButton);

  div.appendChild(h1);
  div.appendChild(form);
  
  return div;
}

document.addEventListener('DOMContentLoaded', () => {
  let main = document.querySelector('main');
  let scheduleForm = document.querySelector('form.schedule');

  retrieveSchedules();

  scheduleForm.addEventListener('submit', event => {
    event.preventDefault();
    
    let formData = new FormData(scheduleForm);
    let scheduleId = Number(formData.get('schedule'));
    let email = formData.get('email');
    let bookingData = {
      id: scheduleId,
      student_email: email
    }

    let jsonBookingData = JSON.stringify(bookingData);
    console.log(jsonBookingData);

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/api/bookings');
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', event => {
      let status = request.status;
      let responseText = request.responseText;

      if (status === 204) {
        alert('Booked');
      } else if (responseText.match(/Schedule/g)) {
        alert(responseText);
      } else if (responseText.match(/Student/g)) {
        let bookingSequence = Number(responseText.match(/\d+/g)[0]);
        alert(responseText);
        main.appendChild(newStudentDetailsHTML(email, bookingSequence));

        let newStudentForm = document.querySelector('form.student');
        
        newStudentForm.addEventListener('submit', event => {
          event.preventDefault();
          let studentFormData = new FormData(newStudentForm);

          let studentName = studentFormData.get('name');

          if (studentName) {
            let newStudentData = {
              email: email,
              name: studentName,
              booking_sequence: bookingSequence
            };

            let jsonStudentData = JSON.stringify(newStudentData);

            let newStudentRequest = new XMLHttpRequest();
            newStudentRequest.open('POST', 'http://localhost:3000/api/students');
            newStudentRequest.setRequestHeader('Content-Type', 'application/json');

            newStudentRequest.addEventListener('load', event => {
              let status = newStudentRequest.status;

              if (status === 201) {
                alert(newStudentRequest.responseText);

                let bookingRequest = new XMLHttpRequest();
                bookingRequest.open('POST', 'http://localhost:3000/api/bookings');
                bookingRequest.setRequestHeader('Content-Type', 'application/json');

                bookingRequest.addEventListener('load', event => {
                  if (bookingRequest.status === 204) {
                    alert('Booked');
                    let div = document.querySelector('div');
                    div.remove();
                    scheduleForm.reset();
                  }
                });

                bookingRequest.send(jsonBookingData);
              }
            });

            newStudentRequest.send(jsonStudentData);

          } else {
            alert('Check student name input');
          }
        });
      }
    });

    request.send(jsonBookingData);
  })  
});