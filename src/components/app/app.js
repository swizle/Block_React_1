import { formatDistanceToNow } from 'date-fns';
import React, { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './app.css';

export default class App extends Component {
  state = {
    tasks: [
    ],
    filter: 'All',
    idList: 0,
  };

  AddTask = (text, timer) => {
    const { idList } = this.state;

    const newItem = {
      id: idList,
      description: text,
      created: formatDistanceToNow(new Date()),
      completed: false,
      editing: false,
      time: timer,
    };

    const newIdList = idList + 1;

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newItem],
      idList: newIdList,
    }));
  };

  DeleteTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }));
  };

  EditTask = (id, text) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            description: text,
          };
        }
        return element;
      }),
    }));
  };

  // eslint-disable-next-line class-methods-use-this
  ToggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  TaskClick = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.ToggleProperty(tasks, id, 'completed'),
    }));
  };

  EditClick = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.ToggleProperty(tasks, id, 'editing'),
    }));
  };

  changeFilter = (data) => {
    this.setState({ filter: data });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((element) => !element.completed),
    }));
  };

  render() {
    const { tasks, filter } = this.state;
    const filterItems = ['All', 'Active', 'Completed'];

    return (
      <section className="todoapp">
        <NewTaskForm onAddTask={this.AddTask} />
        <section className="main">
          <TaskList
            tasks={tasks.map((task) => {
              if (filter === filterItems[0]
                || (filter === filterItems[1] && !task.completed)
                || (filter === filterItems[2] && task.completed)) {
                return task;
              }
              return null;
            }).filter((task) => task !== null)}
            onDeleted={this.DeleteTask}
            onTaskClick={this.TaskClick}
            onEditClick={this.EditClick}
            onEditTask={this.EditTask}
          />
          <Footer
            changeFilter={this.changeFilter}
            clearCompleted={this.clearCompleted}
            lefts={tasks.filter(({ completed }) => !completed).length}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}
