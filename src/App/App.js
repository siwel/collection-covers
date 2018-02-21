import React, {Component} from "react";
import "./App.css";
import ApplicationOptionsExample from "../ApplicationOptionsExample";


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-intro">
                    <ApplicationOptionsExample/>
                </div>
            </div>
        );
    }
}

export default App;
