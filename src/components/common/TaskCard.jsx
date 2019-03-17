import React from "react";
import Countdown from "react-countdown-now";
import { Segment, Label, Icon } from "semantic-ui-react";
import { archiveTask, checkIfDone } from "../../services/TasksServices";
import { deleteTaskfromTasks } from "./../../services/TasksServices";

function TaskCard({ task, updateState }) {
  const message = (days, hours, minutes, seconds) => {
    return (
      <div>
        {days ? days + "DAYS" : "TODAY"} {hours}:{minutes}:{seconds}{" "}
        <Icon onClick={() => deleteTask(task)} name="trash" />
      </div>
    );
  };
  const Completionist = () => (
    <Segment inverted>
      <Label size="big" color="black">
        <Icon
          onClick={() => checkCircle(task)}
          name={task.done ? "check circle" : "warning circle"}
        />
        {task.title}
      </Label>
      <div className="timer">
        TASK EXPIRED...
        <Icon onClick={() => deleteTask(task)} name="trash" />
      </div>
    </Segment>
  );

  const checkCircle = task => {
    checkIfDone(task);
  };

  const deleteTask = task => {
    const remainingTasks = deleteTaskfromTasks(task._id);
    updateState(remainingTasks);
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      archiveTask(task._id);
      return <Completionist />;
    } else {
      return (
        <Segment inverted>
          <Label size="big" color="black">
            <Icon
              onClick={() => checkCircle(task)}
              name={task.done ? "check circle" : "circle outline"}
            />
            {task.title}
          </Label>
          <div className="timer">{message(days, hours, minutes, seconds)}</div>
        </Segment>
      );
    }
  };

  return (
    <div>
      <Countdown date={task.date} intervalDelay={10} renderer={renderer} />
    </div>
  );
}

export default TaskCard;
