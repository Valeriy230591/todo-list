import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task.jsx';

function TaskList({ todos, onDeleted, onToggleComplet, onToggleEdit }) {
  const elements = todos.map((item) => (
    <Task
      {...item}
      key={item.id}
      onDeleted={() => onDeleted(item.id)}
      onToggleComplet={() => onToggleComplet(item.id)}
      onToggleEdit={(newText) => onToggleEdit(item.id, newText)}
    />
  ));
  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  );
}
TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleComplet: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
};
TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleComplet: () => {},
  onToggleEdit: () => {},
};
export default TaskList;
