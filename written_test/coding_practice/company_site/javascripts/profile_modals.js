"use strict";

// Vanilla JavaScript

const PROFILES = {
  'Kevin Wang': 'Kevin Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Louis Burton': 'Louis Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Kasper Salto': 'Kasper Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Chris Lee': 'Chris Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

document.addEventListener('DOMContentLoaded', function() {
  let modal = document.querySelector('.modal');
  let modalContent = document.querySelector('.modal-content');

  document.querySelectorAll('ul')[1].addEventListener('click', function(event) {
    event.preventDefault();

    let memberElement = event.target.closest('a');

    if (memberElement) {
      let memberIMG = memberElement.querySelector('img');
      let memberName = memberIMG.getAttribute('alt');
      let memberJPGFile = memberIMG.getAttribute('src');
      let memberProfile = PROFILES[memberName];
      
      modal.style.visibility = 'visible';
      modalContent.style.visibility = 'visible';
      modal.style.opacity = '1';
      modalContent.style.opacity = '1';

      let modalIMG = document.querySelector('.modal-header img');
      let modalName = document.querySelector('.modal-header p');
      let modalProfile = document.getElementById('profile');

      console.log(modalIMG);

      modalIMG.setAttribute('src', memberJPGFile);
      modalName.innerHTML = memberName;
      modalProfile.innerHTML = memberProfile;

      let closeIcon = document.getElementById('close');
     
      [modal, closeIcon].forEach((element) => {
        element.addEventListener('click', function(event) {
          modal.style.opacity = '0';
          modalContent.style.opacity = '0';
          setTimeout(() => {
            modal.style.visibility = 'hidden';
            modalContent.style.visibility = 'hidden';
          }, 800);
        });
      });
    }
  });
});
