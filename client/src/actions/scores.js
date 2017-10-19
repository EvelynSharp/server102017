import axios from 'axios';

export const getTopScores = (num) => {
  return(dispatch) => {
    axios.get(`api/scores/top/${num}`)
      .then( res => dispatch({ type: 'GET_TOP_SCORES', scores: res.data }) )
  }
}


export const addScore = (username, score, time) => {
  return(dispatch) => {
    console.log('addScore')
    axios.patch(`api/scores`, { username, score, time })
      .then( res => dispatch({ type: 'ADD_SCORE', score: res.data }) )
  }
}
