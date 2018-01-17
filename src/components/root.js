import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./mainPage/mainPage";


class Root extends React.Component {

    render() {

        return (
            <div>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                </Switch>
            </div>
        );
    }
}

export default Root;