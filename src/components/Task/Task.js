import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Task.propTypes = {
  task: PropTypes.shape( {
    id: PropTypes.number,
    description: PropTypes.string,
    created: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool
  } ),
  onDeleted: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

Task.defaultProps = {
  task: {},
};
