import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './app.css';

export default class App extends Component {

  state = {
    tasks: [
      {
        id: 1,
        description: 'Completed task',
        created: formatDistanceToNow( new Date( 2023, 2, 2, 20, 20, 20 ) ),
        completed: true,
        editing: false,
      },
      {
        id: 2,
        description: 'Editing task',
        created: formatDistanceToNow( new Date( 2023, 2, 2, 20, 20, 15 ) ),
        completed: false,
        editing: true,
      },
      {
        id: 3,
        description: 'Active task',
        created: formatDistanceToNow( new Date( 2023, 2, 2, 20, 20, 5 ) ),
        completed: false,
        editing: false,
      },
    ]
  }

  DeleteTask = ( id ) => {
    this.setState( ( { tasks } ) => {
      const idx = tasks.findIndex( ( el ) => el.id === id )

      const before = tasks.slice( 0, idx );
      const after = tasks.slice( idx + 1 );

      const newArr = [...before, ...after];

      return {
        tasks: newArr
      };
    } );
  }

  render () {
    return (
      <section className="todoapp" >
        <NewTaskForm />
        <section className='main'>
          <TaskList tasks={this.state.tasks} onDeleted={this.DeleteTask} />
          <Footer />
        </section>
      </section>
    );
  }
}