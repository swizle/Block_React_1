import React, { Component } from 'react';

import TasksFilter from '../TasksFilter';
import './footer.css';

export default class Footer extends Component {
  render () {
    const { changeFilter, clearCompleted, filter, lefts } = this.props;

    return (
      <footer className='footer'>
        <span className='todo-count'>{lefts} items left</span>
        <TasksFilter
          changeFilter={changeFilter}
          filter={filter} />
        <button
          className='clear-completed'
          onClick={clearCompleted}>Clear completed</button>
      </footer>
    );
  }
}