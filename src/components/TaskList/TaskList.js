import React from 'react';

import Task from '../Task'
import './TaskList.css';

const TaskList = ( { tasks, onDeleted, onTaskClick, onEditClick, onEditTask } ) => {
  return (
    <ul className="todo-list">
      {tasks.map( ( task ) => (
        <Task
          task={task}
          key={task.id}
          description={task.description}
          created={task.created}
          completed={task.completed}
          editing={task.editing}
          onDeleted={() => onDeleted( task.id )}
          onTaskClick={() => onTaskClick( task.id )}
          onEditClick={() => onEditClick( task.id )}
          onEditTask={onEditTask}
        />
      ) )}
    </ul>
  );
}


export default TaskList;