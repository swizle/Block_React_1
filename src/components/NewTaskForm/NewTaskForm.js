/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
    timerSec: '',
    timerMin: '',
  };

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onTimerSecChange = (e) => {
    this.setState({
      timerSec: e.target.value,
    });
  };

  onTimerMinChange = (e) => {
    this.setState({
      timerMin: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onAddTask } = this.props;
    const { description, timerSec, timerMin } = this.state;

    if (description.trim() !== '' && (timerSec || timerMin)) {
      onAddTask(description, Number(timerSec) + Number(timerMin) * 60);
      this.setState({
        description: '',
        timerSec: 0,
        timerMin: 0,
      });
    }
  };

  render() {
    const { description, timerSec, timerMin } = this.state;
    return (
      <header className="header">
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <h1>todos</h1>
          <input
            className="new-todo"
            onChange={this.onDescriptionChange}
            placeholder="What needs to be done"
            value={description}
          />
          <input
            className="new-todo-form__timer"
            onChange={this.onTimerMinChange}
            placeholder="Min"
            value={timerMin}
          />
          <input
            className="new-todo-form__timer"
            onChange={this.onTimerSecChange}
            placeholder="Sec"
            value={timerSec}
          />
          <button type="submit" />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
