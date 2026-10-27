
import React, { Component } from "react";
import "./App.css";

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li>
      <span
        onClick={() => toggleTask(task.id)}
        style={{
          textDecoration: task.done ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}

class App extends Component {
  state = {
    text: "",
    tasks: []
  };

  addTask = () => {
    const text = this.state.text.trim();

    if (text === "") return;

    const task = {
      id: Date.now(),
      text: text,
      done: false
    };

    this.setState({
      tasks: [...this.state.tasks, task],
      text: ""
    });
  };

  toggleTask = (id) => {
    this.setState({
      tasks: this.state.tasks.map(task =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    });
  };

  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id)
    });
  };

  render() {
    const { text, tasks } = this.state;
    const done = tasks.filter(task => task.done).length;

    return (
      <div className="app">
        <h2>My To-Do App</h2>

        <input
          value={text}
          onChange={e => this.setState({ text: e.target.value })}
          placeholder="Enter a task"
        />

        <button onClick={this.addTask}>Add</button>

        <p>{done} of {tasks.length} tasks done</p>

        {tasks.length === 0 ? (
          <p>No tasks yet. Add one!</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={this.toggleTask}
                deleteTask={this.deleteTask}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
