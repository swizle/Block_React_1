import React, { Component } from 'react';

import './Task.css';

export default class Task extends Component {

  state = {
    description: this.props.description,
  }

  onSubmit = ( e ) => {
    e.preventDefault();
    const {
      onEditTask,
      onEditClick
    } = this.props;
    onEditTask( this.props.task.id, this.state.description )
    this.setState( { description: '' } );
    onEditClick()
  };

  render () {

    let { description, created, completed, editing, onDeleted, onTaskClick, onEditClick } = this.props;

    let classNames = '';
    if ( completed ) {
      classNames += ' completed';
    }

    if ( editing ) {
      classNames += ' editing';
    }

    return (
      <li className={classNames}>
        <div className='view'>
          <input className='toggle' type='checkbox' defaultChecked={completed} onClick={onTaskClick} />
          <label>
            <span className='description'>{description}</span>
            <span className='created'>created {created}</span>
          </label>
          <button className='icon icon-edit' onClick={onEditClick}></button>
          <button className='icon icon-destroy' onClick={onDeleted}></button>
        </div>
        {editing &&
          <form onSubmit={this.onSubmit}>
            <input type='text' className='edit' value={this.state.description}
              onChange={( e ) => this.setState( { description: e.target.value } )} />
          </form>}
      </li>
    );
  }
}