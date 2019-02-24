import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function F1(props) {
  return (
    <div className="bordered">
      1111
      <F2 />
    </div>
  );
}

function F2(props) {
  return (
    <div className="bordered">
      2222
      <F3 />
    </div>
  );
}

function F3(props) {
  return (
    <div className="bordered">
      3333
      <NContext.Consumer>
        {state => <F4 n={state.value} update={state.update} />}
      </NContext.Consumer>
    </div>
  );
}

function F4(props) {
  return (
    <div className="bordered">
      {console.dir(props.n)}
      4444, {props.n} <button onClick={props.update}>+1</button>
    </div>
  );
}

const NContext = React.createContext({
  value: 100,
  update: () => console.log("hhhh")
});

class App extends React.Component {
  constructor() {
    super();
    this.update = () => {
      this.setState(state => {
        console.log(this.state);
        return { value: state.value + 1 };
      });
    };
    this.state = {
      value: 100,
      str: "sdf",
      update: this.update
    };
  }

  render() {
    return (
      <NContext.Provider value={this.state}>
        <F1 />
      </NContext.Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
