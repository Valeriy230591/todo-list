import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../TaskFilter/TaskFilter.jsx';

function Footer({
  completedCount,
  onFilterChange,
  currentFilter,
  onClearCompleted,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left</span>
      <TaskFilter
        onFilterChange={onFilterChange}
        currentFilter={currentFilter}
      />
      <button onClick={onClearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}
Footer.defaultProps = {
  completedCount: 0,
  onFilterChange: () => {},
  currentFilter: 'all',
  onClearCompleted: () => {},
};
Footer.propTypes = {
  completedCount: PropTypes.number,
  onFilterChange: PropTypes.func,
  currentFilter: PropTypes.string,
  onClearCompleted: PropTypes.func,
};
export default Footer;
