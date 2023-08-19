/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {
  state = {
    description2: this.getDescription(),
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onEditTask, onEditClick, task } = this.props;
    const { description2 } = this.state;
    onEditTask(task.id, description2);
    this.setState({ description2: '' });
    onEditClick();
  };

  getDescription() {
    const { task: { description } } = this.props;
    return description;
  }

  render() {
    const {
      task, onDeleted, onTaskClick, onEditClick,
    } = this.props;
    const {
      id, description, created, completed, editing,
    } = task;
    const { description2 } = this.state;

    let classNames = '';
    if (completed) {
      classNames += ' completed';
    }

    if (editing) {
      classNames += ' editing';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" id={`task-${id}`} type="checkbox" defaultChecked={completed} onClick={onTaskClick} />
          <label htmlFor={`edit-input-${id}`}>
            <span className="description">{description}</span>
            <span className="created">
              created
              {created}
            </span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEditClick} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {editing && (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              id={`edit-input-${task.id}`}
              className="edit"
              value={description2}
              onChange={(e) => this.setState({ description2: e.target.value })}
            />
          </form>
        )}
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    created: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
  }),
  onDeleted: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

Task.defaultProps = {
  task: {},
};
