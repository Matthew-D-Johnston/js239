"use strict";

function removeHighlight() {
  let highlighted = document.querySelector('.highlight');

  if (highlighted) {
    highlighted.classList.remove('highlight');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let main = document.querySelector('main');
  let articles = document.querySelectorAll('article');
  let articlesArray = Array.prototype.slice.call(articles);
  let articleLinks = document.querySelectorAll('a');
  let articleLinksArray = Array.prototype.slice.call(articleLinks);

  main.addEventListener('click', event => {
    if (['MAIN', 'H1'].includes(event.target.tagName)) {
      removeHighlight();
      main.classList.add('highlight');
    }
  });
  
  articlesArray.forEach(article => {
    article.addEventListener('click', event => {
      removeHighlight();

      article.classList.add('highlight');
    });
  });

  articleLinksArray.forEach(articleLink => {
    articleLink.addEventListener('click', event => {
      let href = articleLink.getAttribute('href');
      removeHighlight();

      let article = document.querySelector(href);
      article.classList.add('highlight');
    });
  });
});
