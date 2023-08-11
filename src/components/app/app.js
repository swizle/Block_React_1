import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './app.css';

const tasks = [
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
];

const App = () => {
  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className='main'>
        <TaskList tasks={tasks} />
        <Footer />
      </section>
    </section>
  );
}
export default App;