import React from "react";
import Body from "../common/Body";
import { CreateBar } from "../common/InputBars";
import TaskCard from "./../common/TaskCard";
import "./HomePage.css";

function HomePage({ tasks, updateState, ...props }) {
  const generateTasks = () => {
    return tasks.map(task => (
      <TaskCard updateState={updateState} key={task._id} task={task} />
    ));
  };

  return (
    <div>
      <Body bar={CreateBar(props)} body={generateTasks()} />
    </div>
  );
}

export default HomePage;
