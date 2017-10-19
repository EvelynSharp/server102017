const express = require('express');
const router = express.Router();
const getQuery = require('../models/db');

const sortTopList = (arr, num) => {
  return [...arr].sort((a,b) => b.score - a.score )
                 .slice(0, num)
}

router.get('/top/:num', (req, res) => {
  const returnResult = (hasError, result={}) => {
      if (hasError)
          console.log('Error')
        res.json(sortTopList(result.rows, req.params.num))
  }
  getQuery('SELECT username, score, time FROM scores ORDER BY time ASC', [], returnResult)
})


router.patch('/', (req, res) => {
  const { username, score } = req.body
  const returnResult = (hasError, result={}) => {
    if(hasError) {
      console.log('Error')
    } else {
      res.json(result.rows[0])
    }
  }
  const getNewRecord = (hasError, result={}) => {
    if(hasError)
      console.log('Error')
    getQuery('SELECT username, score, time FROM scores WHERE username = ?;', [username], returnResult)
  }
  const checkUser = (hasError, result={})  => {
    const { rows } = result;
    if(hasError) {
      console.log('Error')
    } else {
      if (rows.length < 1) {
        getQuery('INSERT INTO scores(username, score, time) VALUES (?, ?, NOW());', [username, score], getNewRecord)
      } else {
        if(rows[0].score < score) {
          getQuery('UPDATE scores SET score = ?, time = NOW() WHERE username = ?;', [score, username ], getNewRecord)
        } else {
          res.json(rows[0])
        }
      }
    }
  }
  getQuery('SELECT username, score, time FROM scores WHERE username=?;', [ username ], checkUser)

})


module.exports = router;
