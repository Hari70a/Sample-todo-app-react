import React, { Component } from "react";

export default class TodoForm extends Component {
  inputRef = React.createRef();
  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.inputRef}
          placeholder="Todo"
          value={this.props.value}
          onChange={e => this.props.onChange(e)}
        />
        <button
          onClick={() => {
            this.props.onClick(this.props.item);
            this.inputRef.current.value = "";
            this.props.history.push("/");
          }}
        >
          {this.props.btnText}
        </button>
        <br />
      </div>
    );
  }
}
