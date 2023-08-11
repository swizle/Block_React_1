import React from 'react';

import Task from '../Task'
import './TaskList.css';

const TaskList = ( props ) => {
  const { tasks } = props;

  return (
    <ul className="todo-list">
      {tasks.map( ( task ) => (
        <Task
          key={task.id}
          description={task.description}
          created={task.created}
          completed={task.completed}
          editing={task.editing}
        />
      ) )}
    </ul>
  );
}


export default TaskList;