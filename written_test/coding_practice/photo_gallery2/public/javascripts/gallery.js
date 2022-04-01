"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let slides = document.getElementById('slides');
  let photoInformation = document.querySelector('section header');
  let commentsList = document.querySelector('#comments ul');
  let photoIDs = {};

  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/photos');
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let request = event.target;

    let photosScript = document.getElementById('photos');
    let photosTemplate = Handlebars.compile(photosScript.innerHTML);
    let photos = request.response;
    slides.innerHTML = photosTemplate({ photos: photos });

    let photoInformationScript = document.getElementById('photo_information');
    let photoInformationTemplate = Handlebars.compile(photoInformationScript.innerHTML);
    let photoSet1 = photos[0];
    photoInformation.innerHTML = photoInformationTemplate(photoSet1);

    photos.forEach(photo => {
      photoIDs[photo.id] = photo.id;
    });

    let commentsRequest = new XMLHttpRequest();
    commentsRequest.open('GET', `http://localhost:3000/comments?photo_id=${photoIDs[1]}`);
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
  });

  request.send();
});
