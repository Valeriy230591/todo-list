import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.completed,
      editing: this.props.editing,
      editText: this.props.label,
      created: new Date(),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.completed !== this.props.completed) {
      this.setState({ completed: this.props.completed });
    }
    if (prevProps.editing !== this.props.editing) {
      this.setState({
        editing: this.props.editing,
        editText: '',
      });
    }
  }

  handleInputChange = (e) => {
    const newInputValue = e.target.value.trim();

    if (newInputValue !== '') {
      this.setState({ editText: newInputValue });
    } else {
      this.setState({ editText: this.props.label });
    }
  };

  handleInputBlur = (e) => {
    e.preventDefault();
    const { onToggleEdit } = this.props;
    const { editText } = this.state;
    const trimmedEditText = editText.trim();
    console.log(trimmedEditText);
    if (trimmedEditText !== '' && trimmedEditText !== this.props.label) {
      onToggleEdit(trimmedEditText);
      this.setState({ editing: false, editText: trimmedEditText });
    } else {
      onToggleEdit(this.props.label);
      this.setState({ editing: false, editText: this.props.label });
    }
  };

  render() {
    const { label, id, onDeleted, onToggleComplet, onToggleEdit } = this.props;
    const { completed, editing, editText, created } = this.state;
    const classNames = completed ? 'completed' : '';
    const distanceToNow = formatDistanceToNow(created, { addSuffix: true });
    return (
      <li key={id} className={classNames + (editing ? ' editing' : '')}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={() => {
              this.setState({ completed: !completed }, () => {
                onToggleComplet(id);
              });
            }}
            checked={completed}
          />
          <label htmlFor="inputField">
            <span id="inputField" className="description">
              {label}
            </span>
            <span
              id="inputField"
              className="created"
            >{`created ${distanceToNow}`}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => onToggleEdit(editText)}
          />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input
          type="text"
          className="edit"
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          value={editText}
          autoFocus
        />
      </li>
    );
  }
}
Task.defaultProps = {
  label: '',
  id: 0,
  completed: false,
  editing: false,
  onDeleted: () => {},
  onToggleComplet: () => {},
  onToggleEdit: () => {},
};

Task.propTypes = {
  label: PropTypes.string,
  id: PropTypes.number,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleComplet: PropTypes.func,
  onToggleEdit: PropTypes.func,
};
