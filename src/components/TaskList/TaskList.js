import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

export default function TaskList({
  tasks,
  onDeleted,
  onTaskClick,
  onEditClick,
  onEditTask,
  onTimerFinished,
}) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleted={() => onDeleted(task.id)}
          onTaskClick={() => onTaskClick(task.id)}
          onEditClick={() => onEditClick(task.id)}
          onEditTask={onEditTask}
          onTimerFinished={onTimerFinished}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      created: PropTypes.string,
      completed: PropTypes.bool,
      editing: PropTypes.bool,
      time: PropTypes.number,
    }),
  ),
  onDeleted: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onTimerFinished: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  tasks: [],
};
