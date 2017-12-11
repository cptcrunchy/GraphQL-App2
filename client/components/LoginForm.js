import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AuthForm from './AuthForm';
import LoginMutation from '../mutations/LogIn';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch( res => {
      const errors = res.graphQLErrors.map( err => err.message);
      this.setState({ errors });
    });
  }


  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}
export default graphql(LoginMutation)(LoginForm);