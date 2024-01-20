import React, { Component } from 'react';
import Footer from '../Footer/Footer.js';
import TaskList from '../TaskList/TaskList.js';
import NewTaskForm from '../NewTaskForm/NewTaskForm.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: [
        this.createTodoItem('I am eat my food'),
        this.createTodoItem('i go to training'),
        this.createTodoItem('I go in my home'),
      ],
      filter: 'all',
    };
  }

  maxId = 100;

  handleClearCompleted = () => {
    const { todoData } = this.state;
    const newTodoData = todoData.filter((task) => !task.completed);
    this.setState({ todoData: newTodoData });
  };

  handleFilterChange = (newFilter) => {
    this.setState({ filter: newFilter });
  };

  getFilteredTasks = () => {
    const { todoData, filter } = this.state;
    if (filter === 'all') {
      return todoData;
    }
    if (filter === 'active') {
      return todoData.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return todoData.filter((task) => task.completed);
    }
    return todoData;
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return { todoData: newArr };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArray };
    });
  };

  onToggleComplet = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArray,
      };
    });
  };

  onToggleEdit = (id, newText) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing, label: newText };
      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArray,
      };
    });
  };

  createTodoItem(label) {
    return { label, completed: false, editing: false, id: this.maxId++ };
  }

  render() {
    const { filter } = this.state;
    const filteredTasks = this.getFilteredTasks();
    const completedCount = this.state.todoData.filter(
      (el) => !el.completed
    ).length;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <TaskList
          todos={filteredTasks}
          onDeleted={this.deleteItem}
          onToggleComplet={this.onToggleComplet}
          onToggleEdit={this.onToggleEdit}
        />
        <Footer
          completedCount={completedCount}
          onFilterChange={this.handleFilterChange}
          currentFilter={filter}
          onClearCompleted={this.handleClearCompleted}
        />
      </section>
    );
  }
}
