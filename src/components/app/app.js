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
        description: 'Active task',
        created: formatDistanceToNow( new Date( 2023, 2, 2, 20, 20, 5 ) ),
        completed: false,
        editing: true,
      },
    ],
    filter: 'All',
  }

  AddTask = ( text ) => {
    this.setState( ( { tasks } ) => {

      const newItem = {
        id: tasks.length + 1,
        description: text,
        created: formatDistanceToNow( new Date() ),
        completed: false,
        editing: false,
      }

      const newArr = [...tasks, newItem];

      return {
        tasks: newArr
      };
    } );
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

  EditTask = ( id, text ) => {
    this.setState( ( { tasks } ) => {
      return {
        tasks: tasks.map( ( element ) => {
          if ( element.id === id ) element.description = text;
          return element;
        } ),
      }
    } );
  }

  EditProperty ( arr, id, text, propName ) {
    const idx = arr.findIndex( ( el ) => el.id === id );

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: text
    };

    return [
      ...arr.slice( 0, idx ),
      newItem,
      ...arr.slice( idx + 1 )
    ];
  }

  toggleProperty ( arr, id, propName ) {
    const idx = arr.findIndex( ( el ) => el.id === id );

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };

    return [
      ...arr.slice( 0, idx ),
      newItem,
      ...arr.slice( idx + 1 )
    ];
  }

  TaskClick = ( id ) => {
    this.setState( ( { tasks } ) => {
      return {
        tasks: this.toggleProperty( tasks, id, 'completed' )
      };
    } );
  };

  EditClick = ( id ) => {
    this.setState( ( { tasks } ) => {
      return {
        tasks: this.toggleProperty( tasks, id, 'editing' )
      };
    } );
  };

  changeFilter = ( data ) => {
    this.setState( { filter: data } );
  }

  clearCompleted = () => {
    this.setState( ( { tasks } ) => {
      return {
        tasks: tasks.filter( ( element ) => !element.completed )
      }
    } );
  }

  filteredItems = () => {
    const { tasks, filter } = this.state;
    return tasks.filter( ( { completed } ) => {
      const all = filter === 'All';
      const complete = filter === 'Completed';
      return all ? true : complete ? completed === true : completed === false;
    } );
  }

  render () {
    return (
      <section className="todoapp" >
        <NewTaskForm onAddTask={this.AddTask} />
        <section className='main'>
          <TaskList tasks={this.filteredItems()}
            onDeleted={this.DeleteTask}
            onTaskClick={this.TaskClick}
            onEditClick={this.EditClick}
            onEditTask={this.EditTask} />
          <Footer
            changeFilter={this.changeFilter}
            clearCompleted={this.clearCompleted}
            lefts={this.state.tasks.filter( ( { completed } ) => !completed ).length}
            filter={this.state.filter} />
        </section>
      </section>
    );
  }
}