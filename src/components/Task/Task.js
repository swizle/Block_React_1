import React from 'react';

import './Task.css';

const Task = ( props ) => {
  const { description, created, completed, editing } = props;

  return (
    <li className={completed ? 'completed' : editing ? 'editing' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} />
        <label>
          <span className="description">{description}</span>
          <span className="created">created {created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {editing && <input type="text" className="edit" value={description} />}
    </li>
  );
}

export default Task;