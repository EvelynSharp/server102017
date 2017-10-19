import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'semantic-ui-react';
import { addScore } from '../actions/scores';

class ScoreForm extends React.Component {

  state = { user: '', score: '' }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { user, score } = this.state;
    const time = new Date();
    this.props.dispatch(addScore(user, Number(score), time))
  }

  render() {
    const { user, score } = this.state;
    return(
      <Form onSubmit={this.handleSubmit} style={{ paddingTop: '5%'}}>
        <Form.Group  inline>
          <Form.Input
            id='user'
            label='username'
            value={user}
            type="text"
            onChange={this.handleChange}
            required
          />
          <Form.Input
            id='score'
            label='new score'
            value={score}
            type="number"
            onChange={this.handleChange}
            required
          />
          <Button primary>Submit</Button>
        </Form.Group>
      </Form>
    )
  }
}


export default connect()(ScoreForm);
