import React from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

function TasksFilter({ filter, changeFilter }) {
  const filterOptions = ['All', 'Active', 'Completed'];

  return (
    <ul className="filters">
      {filterOptions.map((option) => (
        <li key={option}>
          <button
            type="button"
            onClick={() => changeFilter(option)}
            className={filter === option ? 'selected' : null}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  filter: 'All',
};

export default TasksFilter;
