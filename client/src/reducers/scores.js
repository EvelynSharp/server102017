const scores = (state=[], action) => {
  switch(action.type) {
    case 'GET_TOP_SCORES':
      return action.scores
    case 'ADD_SCORE':
      const { username, score } = action.score
      const index = state.findIndex( s => s.username === username )
      if(index !== -1) {
        return state.map( s => {
          return s.username === username ? action.score : s
        })
      } else {
        if(state.length < 10) {
          return [...state, action.score]
                    .sort((a,b) => new Date(a.time).getTime() - new Date(b.time).getTime())
                    .sort((a, b) => b.score - a.score)
        } else if (state.filter( s => s.score < score ).length > 0 ) {
          return [ ...state.slice(0, state.length - 1), action.score ]
                  .sort((a,b) => new Date(a.time).getTime() - new Date(b.time).getTime())
                  .sort( (a, b) => b.score - a.score )
        } else {
          return state
        }
      }
    default:
      return state;
  }
}

export default scores;
