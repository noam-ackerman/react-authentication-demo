import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <div className="bg-secondary">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", fontFamily: "roboto" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  );
}

export default App;
