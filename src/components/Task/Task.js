/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Task.css';

export default function Task({
  task,
  onDeleted,
  onTaskClick,
  onEditClick,
  onEditTask,
  onTimerFinished,
}) {
  const [description2, setDescription2] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);

  useEffect(() => {
    setDescription2(task.description);
    setTimerSeconds(task.time);
  }, [task]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (timerIsRunning && timerSeconds > 0) {
      const interval = setInterval(() => {
        setTimerSeconds((prevSeconds) => {
          onTimerFinished(task.id, prevSeconds - 1);

          if (prevSeconds <= 1) {
            clearInterval(interval);
            setTimerIsRunning(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerIsRunning, timerSeconds, task, onTimerFinished]);

  const getColor = () => (timerIsRunning ? 'red' : 'gray');
  const timerMinutes = Math.floor(timerSeconds / 60);

  const onSubmit = (e) => {
    e.preventDefault();
    onEditTask(task.id, description2);
    onEditClick();
  };

  return (
    <li className={cn(task, { completed: task.completed, editing: task.editing })}>
      <div className="view">
        <input
          className="toggle"
          id={`task-${task.id}`}
          type="checkbox"
          defaultChecked={task.completed}
          onClick={onTaskClick}
        />
        <label htmlFor={`edit-input-${task.id}`}>
          <span className="title">{task.description}</span>
          <span className="description" style={{ color: getColor() }}>
            <button type="button" className="icon icon-play" onClick={() => setTimerIsRunning(true)} disabled={timerIsRunning} />
            <button type="button" className="icon icon-pause" onClick={() => setTimerIsRunning(false)} disabled={!timerIsRunning} />
            {timerMinutes}
            :
            {timerSeconds - timerMinutes * 60}
          </span>
          <span className="created">
            created
            {' '}
            {task.created}
          </span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEditClick} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {task.editing && (
        <form onSubmit={onSubmit}>
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            type="text"
            id={`edit-input-${task.id}`}
            className="edit"
            value={description2}
            onChange={(e) => setDescription2(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Escape') onEditClick(); }}
          />
        </form>
      )}
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    created: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    time: PropTypes.number,
  }),
  onDeleted: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onTimerFinished: PropTypes.func.isRequired,
};

Task.defaultProps = {
  task: {},
};
