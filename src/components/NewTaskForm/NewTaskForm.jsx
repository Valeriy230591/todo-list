import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;

    if (label.trim() !== '') {
      this.props.onItemAdded(label);
      this.setState({
        label: '',
      });
    }
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  render() {
    const { label } = this.state;

    return (
      <div>
        <input
          value={label}
          onChange={this.onLabelChange}
          onKeyDown={this.onKeyDown}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </div>
    );
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
