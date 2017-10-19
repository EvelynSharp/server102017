const express = require('express');
const router = express.Router();
const getQuery = require('../models/db');

router.get('/top/:num', (req, res) => {
  const returnResult = (hasError, result={}) => {
      if (hasError) {
        console.log('Error')
      } else {
        console.log(result.rows)
        const top = [...result.rows]
          .sort((a,b) => new Date(a.time).getTime() - new Date(b.time).getTime())
          .sort((a,b) => b.score - a.score )
          .slice(0, req.params.num)
        res.json(top)
      }
  }
  getQuery('SELECT username, score, time FROM scores', [], returnResult)
  //console.log(result)
})


router.patch('/', (req, res) => {
  const { username, score, time } = req.body
  const returnResult = (hasError, result={}) => {
    if(hasError) {
      console.log('Error')
    } else {
      res.json({ username, score, time })
    }
  }
  const checkUser = (hasError, result={})  => {
    const { rows } = result;
    console.log(rows)
    if(hasError) {
      console.log('Error')
    } else {
      // console.log(result.rows)
      if (result.rows.length < 1) {
        getQuery('INSERT INTO scores(username, score, time) VALUES (?, ?, ?);', [username, score, time], returnResult)
      } else {
        if(result.rows[0].score < score) {
          getQuery('UPDATE scores SET score = ?, time = ? WHERE username = ?;', [score, time, username ], returnResult)
        } else {
          res.json({username, score: result.rows[0].score, time: result.rows[0].time })
        }
      }
    }
  }

  getQuery('SELECT username, score, time FROM scores WHERE username=?;', [ username ], checkUser)

})


module.exports = router;
