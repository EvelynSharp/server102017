import React from 'react';
import { connect } from 'react-redux';
import { getTopScores } from '../actions/scores';

class TopList extends React.Component {

  componentWillMount = () => {
    this.props.dispatch(getTopScores(10))
  }

  render() {
    const { scores } = this.props;
    return !scores ? null : (
      <div>
        {this.props.scores.map( s => {
            return (
              <div key={s.username}>
                {`${s.username}: ${s.score} points`}
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return { scores: state.scores }
}

export default connect(mapStateToProps)(TopList);
