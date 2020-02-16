'use strict';

$('button.like').on('click', likeMe);
$('button#more').on('click', getCharacters);

function likeMe(){
  let character = $(this).parent()[0];
  let counter = $(character).find('span')[0];
  let count = parseInt($(counter).text());

  count++;

  $(counter).text(count);
}

function getCharacters(){
  let url = 'http://localhost:3000/characters';
  console.log(url);

  $.ajax(url, {
    method: 'get',
    dataType: 'json'
  })
    .then( data => {
      renderMoreCharacters(data);
    });
}

// Wasn't able to get the styling done for the new Handlebars renderings

function renderMoreCharacters(characterInfo) {
  let templateCode = $('#character_template').html();
  let render = Handlebars.compile(templateCode);

  let HTMLCode = render(characterInfo.data);

  $('div.handlebarsHolder').html(HTMLCode);
}
