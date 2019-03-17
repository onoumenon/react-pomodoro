import React, { Component } from "react";
import { Container, Image, Menu, Icon, Segment } from "semantic-ui-react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  NavLink
} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import HowToPage from "./components/pages/HowToPage";
import { getTasks } from "./services/TasksServices";

export class App extends Component {
  state = {
    tasks: getTasks().filter(task => task.show === true)
  };

  filterOption = e => {
    let filterTasks = getTasks();
    if (e === "archived") {
      filterTasks = filterTasks.filter(task => task.show === false);
    } else if (e) {
      filterTasks = filterTasks.filter(task => task[e] === true);
    }
    this.setState({ tasks: filterTasks });
    return filterTasks;
  };

  handleClick = e => {
    this.filterOption(e);
  };

  updateState = tasks => {
    const remainingTasks = tasks;
    this.setState({
      tasks: this.state.tasks.filter(task => remainingTasks.includes(task))
    });
  };

  newTask = task => {
    const currentTasks = this.state.tasks;
    currentTasks.push(task);
    this.setState({ tasks: currentTasks });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Segment inverted style={{ minHeight: "100vh" }}>
            <Menu fixed="top" inverted>
              <Container>
                <Menu.Item header>
                  <NavLink to="/">
                    <Image
                      size="mini"
                      src="/logo.ico"
                      onClick={() => this.handleClick("show")}
                    />
                  </NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/">
                    <Icon
                      size="large"
                      name="tasks"
                      onClick={() => this.handleClick("")}
                    />
                  </NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/">
                    <Icon
                      size="large"
                      name="checkmark box"
                      onClick={() => this.handleClick("done")}
                    />
                  </NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/">
                    <Icon
                      size="large"
                      name="archive"
                      onClick={() => this.handleClick("archived")}
                    />
                  </NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/howto">
                    <Icon size="large" name="question circle" />
                  </NavLink>
                </Menu.Item>
              </Container>
            </Menu>
            <Switch>
              <Route
                path="/howto"
                render={props => <HowToPage {...props} returnPath="/howto" />}
              />
              <Route
                path="/"
                render={props => (
                  <HomePage
                    tasks={this.state.tasks}
                    changeState={this.newTask}
                    updateState={this.updateState}
                    {...props}
                    returnPath="/"
                  />
                )}
              />
              <Redirect from="/home" to="/" />
            </Switch>
          </Segment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
