"use strict";

$(function() {
  $('ul').on('click', 'img', function(event) {
    let $li = $(this).closest('li');
    let idx = $li.index();

    $('figure').stop().filter(':visible').fadeOut(800);
    $('figure').eq(idx).delay(800).fadeIn(800);
    $('.active').removeClass('active');
    $li.addClass('active');
  });
});