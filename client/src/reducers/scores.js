const sortScores = (arr) => {
  return [...arr].sort((a,b) => {
    if(b.score == a.score)
      return new Date(a.time) - new Date(b.time)
    return b.score - a.score
  })
}


const scores = (state=[], action) => {
  switch(action.type) {
    case 'GET_TOP_SCORES':
      return action.scores
    case 'ADD_SCORE':
      const { username, score } = action.newscore;
      const index = state.findIndex( s => s.username === username )
      if(index !== -1) {
        return sortScores(state.map( s =>  s.username === username ? action.newscore : s ))
      } else {
        if(state.length < 10) {
          return sortScores([...state, action.newscore])
        } else if (state.filter( s => s.score < score ).length > 0 ) {
          return sortScores([ ...state.slice(0, state.length - 1), action.newscore ])
        } else {
          return state
        }
      }
    default:
      return state;
  }
}

export default scores;
