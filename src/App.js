
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import LoginComponent from "./views/access/Login";
import IndexConponent from "./layouts/index";

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/login"} component={LoginComponent} />
        <Route
          exact
          path="/console"
          render={() => <Redirect to="/console/home" />}
        />
        <Route path="/console" component={IndexConponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
