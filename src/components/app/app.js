import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './app.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [idList, setIdList] = useState(0);

  const addTask = (text, timer) => {
    const newItem = {
      id: idList,
      description: text,
      created: formatDistanceToNow(new Date()),
      completed: false,
      editing: false,
      time: timer,
    };

    const newIdList = idList + 1;

    setTasks((prevTasks) => [...prevTasks, newItem]);
    setIdList(newIdList);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (id, text) => {
    setTasks((prevTasks) => prevTasks.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          description: text,
        };
      }
      return element;
    }));
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const handleTimerFinished = (id, secs) => {
    setTasks((prevTasks) => prevTasks.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          time: secs,
        };
      }
      return element;
    }));
  };

  const taskClick = (id) => {
    setTasks((prevTasks) => toggleProperty(prevTasks, id, 'completed'));
  };

  const editClick = (id) => {
    setTasks((prevTasks) => toggleProperty(prevTasks, id, 'editing'));
  };

  const changeFilter = (data) => {
    setFilter(data);
  };

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((element) => !element.completed));
  };

  const filterItems = ['All', 'Active', 'Completed'];

  return (
    <section className="todoapp">
      <NewTaskForm onAddTask={addTask} />
      <section className="main">
        <TaskList
          tasks={tasks
            .map((task) => {
              if (
                filter === filterItems[0]
                || (filter === filterItems[1] && !task.completed)
                || (filter === filterItems[2] && task.completed)
              ) {
                return task;
              }
              return null;
            })
            .filter((task) => task !== null)}
          onDeleted={deleteTask}
          onTaskClick={taskClick}
          onEditClick={editClick}
          onEditTask={editTask}
          onTimerFinished={handleTimerFinished}
        />
        <Footer
          changeFilter={changeFilter}
          clearCompleted={clearCompleted}
          lefts={tasks.filter(({ completed }) => !completed).length}
          filter={filter}
        />
      </section>
    </section>
  );
}
