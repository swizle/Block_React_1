/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Task.css';

export default class Task extends Component {
  state = {
    description2: this.getDescription(),
    timerSeconds: this.getTimer(),
    timerIsRunning: false,
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

  getTimer() {
    const { task: { time } } = this.props;
    return time;
  }

  startTimer = () => {
    const { timerIsRunning } = this.state;
    if (!timerIsRunning) {
      this.setState({ timerIsRunning: true });
      this.interval = setInterval(() => {
        this.setState((prevState) => ({ timerSeconds: prevState.timerSeconds - 1 }));
      }, 1000);
    }
  };

  stopTimer = () => {
    const { timerIsRunning } = this.state;
    if (timerIsRunning) {
      clearInterval(this.interval);
      this.setState({ timerIsRunning: false });
    }
  };

  render() {
    const {
      task, onDeleted, onTaskClick, onEditClick,
    } = this.props;
    const {
      id, description, created, completed, editing,
    } = task;
    const { description2, timerSeconds, timerIsRunning } = this.state;

    const getColor = () => {
      if (timerIsRunning) {
        return 'red';
      }
      return 'gray';
    };

    return (
      <li className={cn(task, { completed, editing })}>
        <div className="view">
          <input className="toggle" id={`task-${id}`} type="checkbox" defaultChecked={completed} onClick={onTaskClick} />
          <label htmlFor={`edit-input-${id}`}>
            <span className="title">{description}</span>
            <span className="description" style={{ color: getColor() }}>
              <button type="button" className="icon icon-play" onClick={this.startTimer} disabled={timerIsRunning} />
              <button type="button" className="icon icon-pause" onClick={this.stopTimer} disabled={!timerIsRunning} />
              {timerSeconds}
            </span>
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
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              type="text"
              id={`edit-input-${task.id}`}
              className="edit"
              value={description2}
              onChange={(e) => this.setState({ description2: e.target.value })}
              onKeyDown={(e) => { if (e.key === 'Escape') { onEditClick(); } }}
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
    time: PropTypes.string,
  }),
  onDeleted: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

Task.defaultProps = {
  task: {},
};
