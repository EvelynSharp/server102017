import axios from 'axios';

export const getTopScores = (num) => {
  return(dispatch) => {
    console.log('getTopScores')
    axios.get(`api/scores/top/${num}`)
      .then( res => dispatch({type: 'GET_TOP_SCORES', scores: res.data}) )
  }
}


export const addScore = (user, score) => {
  return(dispatch) => {
    console.log('addScore')
    axios.patch(`api/scores`, { user, score })
      .then( res => console.log(res.data) )
  }
}
