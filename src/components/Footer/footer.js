import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

import './footer.css';

export default function Footer({
  changeFilter,
  clearCompleted,
  filter,
  lefts,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {lefts}
        {' '}
        items left
      </span>
      <TasksFilter changeFilter={changeFilter} filter={filter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  lefts: PropTypes.number,
  filter: PropTypes.string,
};

Footer.defaultProps = {
  lefts: 0,
  filter: 'All',
};
