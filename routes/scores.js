//this file is for handling api calls to route api/scores
const express = require('express');
const router = express.Router();
const getQuery = require('../models/db');

//handle get req for top scores
router.get('/top/:num', (req, res) => {
  const returnResult = (hasError, result={}) => {
      if (hasError)
          console.log('Error')
        res.json(result.rows)
  }
  getQuery('SELECT username, score, time FROM scores ORDER BY score DESC, time ASC LIMIT ? ;', [Number(req.params.num)], returnResult)
})

//to add/update new score and return new record to front end 
router.patch('/', (req, res) => {
  const { username, score } = req.body;

  const returnResult = (errmsg, result={}) => {
    if(errmsg)
        console.log('Error: ' + errmsg)
      res.json(result.rows[0])
  }

  const getNewRecord = (errmsg, result={}) => {
    if(errmsg)
      console.log('Error: ' + errmsg)
    getQuery('SELECT username, score, time FROM scores WHERE username = ?;', [username], returnResult)
  }

  getQuery('INSERT INTO scores(username, score, time) VALUES (?, ?, NOW()) \
            ON DUPLICATE KEY UPDATE time=if(score < ?, NOW(), time), score = if(score < ?, ?, score);', [ username, score, score, score, score ], getNewRecord)

})


module.exports = router;




// router.patch('/', (req, res) => {
//   const { username, score } = req.body;
//
//   const returnResult = (errmsg, result={}) => {
//     if(errmsg)
//         console.log('Error: ' + errmsg)
//       res.json(result.rows[0])
//   }
//
//   const getNewRecord = (errmsg, result={}) => {
//     if(errmsg)
//       console.log('Error: ' + errmsg)
//     getQuery('SELECT username, score, time FROM scores WHERE username = ?;', [username], returnResult)
//   }
//
//   const checkUser = (errmsg, result={})  => {
//     const { rows } = result;
//     if(errmsg) {
//       console.log('Error: ' + errmsg)
//     } else {
//       if (rows.length < 1) {
//         getQuery('INSERT INTO scores(username, score, time) VALUES (?, ?, NOW());', [username, score], getNewRecord)
//       } else {
//         if(rows[0].score < score) {
//           getQuery('UPDATE scores SET score = ?, time = NOW() WHERE username = ?;', [score, username ], getNewRecord)
//         } else {
//           res.json(rows[0])
//         }
//       }
//     }
//   }
//
//   getQuery('SELECT username, score, time FROM scores WHERE username=?;', [ username ], checkUser)
//
// })
