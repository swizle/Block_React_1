import React from 'react';

import TaskList from '../TaskList';
import Footer from '../Footer';
import './TasksFilter.css';

const TasksFilter = ( { tasks } ) => {
  return (
    <section className="main">
      <TaskList tasks={tasks} />
      <Footer />
    </section>
  );
}

export default TasksFilter;