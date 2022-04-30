"use strict";

function cancelSchedule(scheduleId) {
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', `http://localhost:3000/api/schedules/${scheduleId}`);

  xhr.addEventListener('load', event => {
    if (xhr.status === 204) {
      alert('Schedule cancelled');
    } else {
      alert(xhr.responseText);
    }
  });

  xhr.send();
}

function cancelBooking(bookingId) {
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', `http://localhost:3000/api/bookings/${bookingId}`);

  xhr.addEventListener('load', event => {
    if (xhr.status === 204) {
      alert('Booking cancelled');
    } else {
      alert(xhr.responseText);
    }
  });

  xhr.send();
}