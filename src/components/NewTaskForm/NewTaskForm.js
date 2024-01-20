import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: ``,
    };
  }

  onLabelChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ``,
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.label}
          onChange={this.onLabelChange}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    );
  }
}
NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
