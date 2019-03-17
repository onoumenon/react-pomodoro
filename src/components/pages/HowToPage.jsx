import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import Body from "../common/Body";

const body = () => {
  return (
    <ul>
      <h1>Instructions:</h1>
      <li>
        <Icon name="pencil" size="small" />
        You can add tasks with the create bar.
      </li>
      <li>
        <Icon name="sort" size="small" />
        Tasks are sorted by time left.
      </li>
      <li>
        <Icon name="circle outline" />
        Click on the task check circle to mark task as done.
      </li>
      <li>
        <Icon name="archive" size="small" />
        Tasks that are expired or done are archived.
      </li>
    </ul>
  );
};

export class HowToPage extends Component {
  render() {
    return (
      <div>
        <Body body={body()} />
      </div>
    );
  }
}

export default HowToPage;
