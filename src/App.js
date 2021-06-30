import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import { DataProvider } from "./contexts/DataContext";
import FullPost from "./components/FullPost";


function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
          
            <Router>
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute path="/posts/:postid" component={FullPost} />
              </Switch>
            </Router>
          
        </Container>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
