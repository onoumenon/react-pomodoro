import React from "react";
import { Container, Segment } from "semantic-ui-react";

export function Body({ header, body, bar }) {
  return (
    <Container className="content" fluid text style={{ marginTop: "5em" }}>
      <Segment inverted>{bar}</Segment>
      <Segment inverted>
        <h1>{header}</h1>
        <div>{body}</div>
      </Segment>
    </Container>
  );
}

export default Body;
