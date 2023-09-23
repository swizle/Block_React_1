/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default function NewTaskForm({ onAddTask }) {
  const [description, setDescription] = useState('');
  const [timerSec, setTimerSec] = useState('');
  const [timerMin, setTimerMin] = useState('');

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onTimerSecChange = (e) => {
    setTimerSec(e.target.value);
  };

  const onTimerMinChange = (e) => {
    setTimerMin(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (description.trim() !== '' && (timerSec || timerMin)) {
      onAddTask(description, Number(timerSec) + Number(timerMin) * 60);
      setDescription('');
      setTimerSec('');
      setTimerMin('');
    }
  };

  return (
    <header className="header">
      <form className="new-todo-form" onSubmit={onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          onChange={onDescriptionChange}
          placeholder="What needs to be done"
          value={description}
        />
        <input
          className="new-todo-form__timer"
          onChange={onTimerMinChange}
          placeholder="Min"
          value={timerMin}
        />
        <input
          className="new-todo-form__timer"
          onChange={onTimerSecChange}
          placeholder="Sec"
          value={timerSec}
        />
        <button type="submit" />
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
