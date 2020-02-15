'use strict';

let likeButtons = $('button');

for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', likeMe);
}

function likeMe(e) {
  let character = e.target.parentNode;
  // let character = $(this).parent();
  let counter = character.getElementsByTagName('span')[0];
  let count = parseInt(counter.textContent);
  count++;
  counter.textContent = count;
}