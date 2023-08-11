import React, { Component } from 'react';

import './Task.css';

export default class Task extends Component {

  state = {
    completed: '',
  };

  onTaskClick = () => {
    this.setState( () => {
      return {
        completed: 'completed'
      };
    } );
  };

  render () {

    let { description, created, completed, editing } = this.props;
    completed = this.state.completed;

    return (
      <li className={completed ? 'completed' : editing ? 'editing' : ''}>
        <div className='view'>
          <input className='toggle' type='checkbox' checked={completed} onClick={this.onTaskClick} />
          <label>
            <span className='description'>{description}</span>
            <span className='created'>created {created}</span>
          </label>
          <button className='icon icon-edit'></button>
          <button className='icon icon-destroy' onClick={this.props.onDeleted}></button>
        </div>
        {editing && <input type='text' className='edit' value={description} />}
      </li>
    );
  }
}