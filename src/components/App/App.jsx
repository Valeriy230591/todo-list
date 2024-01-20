import React, { Component } from 'react';
import Footer from '../Footer/Footer.jsx';
import TaskList from '../TaskList/TaskList.jsx';
import NewTaskForm from '../NewTaskForm/NewTaskForm.jsx';

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

  // eslint-disable-next-line class-methods-use-this
  generateRandomId = () => Math.floor(Math.random() * 1000000);

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

  createTodoItem = (text) => ({
    label: text,
    completed: false,
    editing: false,
    id: this.generateRandomId(),
  });

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
      let newItem;
      if (newText) {
        newItem = { ...oldItem, editing: !oldItem.editing, label: newText };
      } else {
        newItem = { ...oldItem, editing: !oldItem.editing };
      }
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
