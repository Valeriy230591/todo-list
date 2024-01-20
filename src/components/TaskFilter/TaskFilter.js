import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
  render() {
    const { currentFilter, onFilterChange } = this.props;
    return (
      <ul className="filters">
        <li>
          <button
            className={currentFilter === 'all' ? 'selected' : ''}
            onClick={() => onFilterChange('all')}
          >
            All
          </button>
        </li>
        <li>
          <button onClick={() => onFilterChange('active')}>Active</button>
        </li>
        <li>
          <button onClick={() => onFilterChange('completed')}>Completed</button>
        </li>
      </ul>
    );
  }
}
TaskFilter.propTypes = {
  onFilterChange: PropTypes.func,
  currentFilter: PropTypes.string,
};

TaskFilter.defaultProps = {
  onFilterChange: () => {},
  currentFilter: 'all',
};
