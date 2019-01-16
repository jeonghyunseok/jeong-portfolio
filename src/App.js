import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Main} from "./Pages/Main";
// import { Vanilla} from "./Pages/Vanilla";


class App extends Component {
  render() {
    return (
      <div className="app_div">
        <Route exact path="/" component={Main} />
        {/* <Route path="/vanilla" component={Vanilla} /> */}
      </div>
    );
  }
}

export default App;
