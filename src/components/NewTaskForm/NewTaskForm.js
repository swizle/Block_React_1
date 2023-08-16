import React, { Component } from 'react';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = ( e ) => {
    this.setState( {
      label: e.target.value
    } );
  };

  onSubmit = ( e ) => {
    e.preventDefault();
    this.props.onAddTask( this.state.label );
    this.setState( {
      label: ''
    } );
  };

  render () {
    return (
      <header className='header'>
        <form onSubmit={this.onSubmit}>
          <h1>todos</h1>
          <input className='new-todo'
            onChange={this.onLabelChange}
            placeholder="What needs to be done"
            value={this.state.label} />
        </form>
      </header>
    );
  };
}