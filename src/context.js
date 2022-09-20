import React, { Component } from "react";
// import axios from "axios";

export const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        // heading: "Search Result",
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    user: {},
    // heading: "Top 10 Tracks",
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };
  //
  //https://cors-anywhere.herokuapp.com/
  componentDidMount() {}

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
