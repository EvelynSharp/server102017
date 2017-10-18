const scores = (state=[], action) => {
  switch(action.type) {
    case 'GET_TOP_SCORES':
      return action.scores
    // case 'ADD_SCORES':
    //   return state.map( s => {
    //
    //   })
    default:
      return state;
  }
}

export default scores;
