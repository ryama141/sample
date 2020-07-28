import React, { Component } from "react";
import Header from "./components/utility/Header";
import TodoList from "./components/todo/TodoList";
import TodoAdd from "./components/todo/TodoAdd";
import { ITodo } from "./components/interfaces";
import axios from "axios";
import "./App.css";

const APIR_URL = "http://localhost:3333/todos";

class App extends Component<{}, { list: ITodo[] }> {
  state = {
    list: [
      {
        id: "1",
        title: "test",
        completed: false,
      },
    ],
  };

  // Toggle Complete
  toggleComplete = (id: string) => this.setState({ list: this.state.list.map(this.mapItem(id)) });

  // Map List Items
  mapItem = (id: string) => (item: ITodo) => {
    if (item.id === id) {
      item.completed = !item.completed;
    }
    return item;
  };

  // Delete Todo Item
  deleteItem = (id: string) => {
    axios.delete(`${APIR_URL}/${id}`).then((res) => this.setState({ list: [...this.state.list.filter((item) => item.id !== id)] }));
  };

  // Add Todo Item
  addItem = (title: string) => {
    axios.post(APIR_URL, { title, completed: false }).then((res) => this.setState({ list: [...this.state.list, res.data] }));
  };

  actions = {
    toggleComplete: this.toggleComplete,
    deleteItem: this.deleteItem,
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <TodoList list={this.state.list} actions={this.actions} />
          <TodoAdd addItem={this.addItem} />
        </div>
      </div>
    );
  }
}

export default App;
