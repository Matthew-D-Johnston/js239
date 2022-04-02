"use strict";

function setComments(commentsList, photoID) {
  let commentsRequest = new XMLHttpRequest();
  commentsRequest.open('GET', `http://localhost:3000/comments?photo_id=${photoID}`);
  commentsRequest.responseType = 'json';

  commentsRequest.addEventListener('load', event => {
    let request = event.target;
    let photoComments = request.response;

    let photoCommentsScript = document.getElementById('photo_comments');
    let photoCommentsTemplate = Handlebars.compile(photoCommentsScript.innerHTML);

    let photoCommentScript = document.getElementById('photo_comment');
    let photoCommentTemplate = document.getElementById(photoCommentScript.innerHTML);
    Handlebars.registerPartial('photoCommentTemplate', photoCommentScript.innerHTML);

    commentsList.innerHTML = photoCommentsTemplate({ comments: photoComments });
  });

  commentsRequest.send();
}

function toggleSlideVisibility(slideFigures, currentIndex, newIndex) {
  slideFigures[currentIndex].classList.remove('visible');
  slideFigures[currentIndex].classList.add('hidden');
  slideFigures[newIndex].classList.remove('hidden');
  slideFigures[newIndex].classList.add('visible');
}

document.addEventListener('DOMContentLoaded', () => {
  let slides = document.getElementById('slides');

  let photoInformation = document.querySelector('section header');
  let photoInformationScript = document.getElementById('photo_information');
  let photoInformationTemplate = Handlebars.compile(photoInformationScript.innerHTML);

  let commentsList = document.querySelector('#comments ul');
  let photos;
  let photoIDs = {};
  let slideFigures;

  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/photos');
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let request = event.target;

    let photosScript = document.getElementById('photos');
    let photosTemplate = Handlebars.compile(photosScript.innerHTML);
    photos = request.response;
    slides.innerHTML = photosTemplate({ photos: photos });
    
    slideFigures = slides.querySelectorAll('figure');
    let currentPhoto = slideFigures[0];
    currentPhoto.classList.add('visible');
    
    for (let index = 1; index < slideFigures.length; index += 1) {
      slideFigures[index].classList.add('hidden');
    }

    let photoSet1 = photos[0];
    photoInformation.innerHTML = photoInformationTemplate(photoSet1);

    photos.forEach(photo => {
      photoIDs[photo.id] = photo.id;
    });

    setComments(commentsList, photoIDs[1]);
  });

  request.send();

  let prevButton = document.querySelector('.prev');

  prevButton.addEventListener('click', event => {
    event.preventDefault();

    let currentSlide = document.querySelector('.visible');
    let currentSlideID = Number(currentSlide.dataset.id);
    let currentSlideIndex = currentSlideID - 1;
    let newSlideID;

    if (currentSlideID === 1) {
      newSlideID = Object.keys(photoIDs).length;
    } else {
      newSlideID = currentSlideID - 1;
    }

    let newSlideIndex = newSlideID - 1;

    toggleSlideVisibility(slideFigures, currentSlideIndex, newSlideIndex);

    let newSlideData = photos[newSlideIndex];
    photoInformation.innerHTML = photoInformationTemplate(newSlideData);

    setComments(commentsList, newSlideID);
  });

  let nextButton = document.querySelector('.next');

  nextButton.addEventListener('click', event => {
    event.preventDefault();

    let currentSlide = document.querySelector('.visible');
    let currentSlideID = Number(currentSlide.dataset.id);
    let currentSlideIndex = currentSlideID - 1;
    let newSlideID;

    if (currentSlideID === Object.keys(photoIDs).length) {
      newSlideID = 1;
    } else {
      newSlideID = currentSlideID + 1;
    }

    let newSlideIndex = newSlideID - 1;

    toggleSlideVisibility(slideFigures, currentSlideIndex, newSlideIndex);

    let newSlideData = photos[newSlideIndex];
    photoInformation.innerHTML = photoInformationTemplate(newSlideData);

    setComments(commentsList, newSlideID);
  });
});
