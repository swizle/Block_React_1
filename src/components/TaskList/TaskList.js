import React from 'react';

import Task from '../Task'
import './TaskList.css';

const TaskList = ( { tasks, onDeleted, onTaskClick } ) => {
  return (
    <ul className="todo-list">
      {tasks.map( ( task ) => (
        <Task
          key={task.id}
          description={task.description}
          created={task.created}
          completed={task.completed}
          editing={task.editing}
          onDeleted={() => onDeleted( task.id )}
          onTaskClick={() => onTaskClick( task.id )}
        />
      ) )}
    </ul>
  );
}


export default TaskList;