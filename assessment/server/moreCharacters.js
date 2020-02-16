'use strict';

const superagent = require('superagent');
const database = require('./database.js');


function moreCharactersHandler(req, res) {
  fetchCharactersFromSWAPI(2)
    .then(data => {
      // console.log(data);
      res.json({data});
      // res.render('index', data);
    })
    .catch(error => { throw error; });
}

function fetchCharactersFromSWAPI(pageNumber) {
  let url = `https://swapi.co/api/people/?page=${pageNumber}`;

  // console.log(url);

  return superagent.get(url)
    .then(response => {
      return getNumberOfLikes(response.body);
    })
    .catch(error => { throw error; });
}

function getNumberOfLikes(data) {
  let names = data.results.map(person => person.name);

  let SQL = 'SELECT * FROM click_counts WHERE remote_id = ANY($1)';

  return database.query(SQL, [names])
    .then(counts => {
      for (let i = 0; i < data.results.length; i++) {
        for (let x = 0; x < counts.rows.length; x++) {
          if (data.results[i].name === counts.rows[x].remote_id) {
            data.results[i].likes = counts.rows[x].clicks;
          }
        }
      }
      return data;
    });
}

module.exports = { moreCharactersHandler };
