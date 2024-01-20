import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TaskFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: props.currentFilter,
    };
  }

  handleFilterChange = (filter) => {
    this.setState({ selectedFilter: filter });
    this.props.onFilterChange(filter);
  };

  render() {
    const filters = ['all', 'active', 'completed'];
    const { selectedFilter } = this.state;

    return (
      <ul className="filters">
        {filters.map((filter) => (
          <li key={filter}>
            <button
              className={selectedFilter === filter ? 'selected' : ''}
              onClick={() => this.handleFilterChange(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          </li>
        ))}
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

export default TaskFilter;
