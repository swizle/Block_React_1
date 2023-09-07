import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
  };

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onAddTask } = this.props;
    const { description } = this.state;

    if (description.trim() !== '') {
      onAddTask(description);
      this.setState({
        description: '',
      });
    }
  };

  render() {
    const { description } = this.state;
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
          {/* <input className="new-todo-form__timer" placeholder="Min" />
          <input className="new-todo-form__timer" placeholder="Sec" /> */}
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
