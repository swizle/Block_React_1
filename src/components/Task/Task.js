import React, { Component } from 'react';

import './Task.css';

export default class Task extends Component {

  state = {
    completed: '',
  };

  render () {

    let { description, created, completed, editing, onDeleted, onTaskClick } = this.props;

    let classNames = '';
    if ( completed ) {
      classNames += 'completed';
    }

    return (
      <li className={classNames}>
        <div className='view'>
          <input className='toggle' type='checkbox' defaultChecked={completed} onClick={onTaskClick} />
          <label>
            <span className='description'>{description}</span>
            <span className='created'>created {created}</span>
          </label>
          <button className='icon icon-edit'></button>
          <button className='icon icon-destroy' onClick={onDeleted}></button>
        </div>
        {editing && <form onSubmit={this.handleSubmit}>
          <input type='text' className='edit' value={description} />
        </form>}
      </li>
    );
  }
}