'use strict';

$('button.like').on('click', likeMe);

function likeMe(){
  let character = $(this).parent()[0];
  let counter = $(character).find('span')[0];
  let count = parseInt($(counter).text());

  count++;

  $(counter).text(count);
}
