import React from "react";
import { Input, Icon, Button, Container } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { newTask } from "./../../services/TasksServices";
import * as Joi from "joi-browser";

export class DTPicker extends React.Component {
  state = {
    startDate: new Date(),
    input: "",
    error: false,
    default: true
  };

  schema = {
    input: Joi.string().required()
  };

  validateInput = () => {
    const result = Joi.validate(this.state.input, this.schema.input);
    return result.error;
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleInputChange = ({ currentTarget: input }) => {
    this.setState({ input: input.value });
  };

  newTask = expiry => {
    if (this.validateInput()) {
      this.setState({ error: true });
      return;
    }
    this.setState({ error: false });
    const task = newTask(this.state.input, expiry);
    this.setState({ input: "" });
    this.props.changeState(task);
    this.props.history.replace(this.props.returnPath);
  };

  triggerVisibility = () => {
    this.setState({ default: !this.state.default });
  };

  render() {
    return (
      <>
        <Container>
          <Input
            fluid
            onChange={this.handleInputChange}
            value={this.state.input}
            placeholder="Create New..."
            error={this.state.error}
          />
          <div style={{ marginTop: "1em" }}>
            <Button.Group compact size="tiny">
              {this.state.default ? (
                <>
                  <Button
                    onClick={() => this.newTask(Date.now() + 60000 * 20)}
                    color="red">
                    20MINS
                  </Button>
                  <Button
                    onClick={() => this.newTask(Date.now() + 60000 * 60)}
                    color="olive">
                    1HR
                  </Button>
                  <Button
                    onClick={() => this.newTask(Date.now() + 60000 * 120)}
                    color="teal">
                    2HRS
                  </Button>
                  <Button.Or />
                </>
              ) : (
                <Container fluid style={{ marginTop: "1em" }}>
                  <Button.Group>
                    <DatePicker
                      className="ui segment"
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeCaption="time"
                      minDate={new Date()}
                      showDisabledMonthNavigation
                      placeholderText="Enter a custom date"
                    />
                    <Button
                      onClick={() => this.newTask(this.state.startDate)}
                      icon>
                      <Icon name="arrow right" />
                    </Button>
                  </Button.Group>
                </Container>
              )}

              <Button onClick={this.triggerVisibility} color="grey">
                {this.state.default ? "CUSTOM" : "TIMERS"}
              </Button>
            </Button.Group>
          </div>
        </Container>
      </>
    );
  }
}

export const SearchBar = () => (
  <Input
    fluid
    inverted
    style={{ marginTop: "2em" }}
    icon={{ name: "search", circular: true, link: true }}
    placeholder="Search..."
  />
);

export const CreateBar = props => <DTPicker {...props} />;
