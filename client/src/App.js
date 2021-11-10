import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Welcome from "./components/Welcome/Welcome";
import PrivateRoute from "./components/Auth/PrivateRoute/PrivateRoute";
import LoginForm from "./components/Auth/loginForms/LoginForm";
import SignUp from "./components/Auth/signUpForms/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../src/Redux/slices/rootReducer";
import SubmitSeccus from "./components/common/succes";
import Warning from "./components/common/warning";
import Profile from "./components/profile/profile";
import MainSignUp from "./components/Auth/signUpForms/singUpMain";
import { Layout } from "antd";
import dotenv from "dotenv";
import AdminCab from "./components/Admin1/adminPage";
dotenv.config()

function App() {
  console.log('rec map payload', process.env.SERVER_API, process.env.YANDEX_API)
  const history = useHistory()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loginInitialPending());
  }, [dispatch]);


  const user = useSelector((state) => state.user);

  const authenticated = Boolean(user?.user?.userId);
  // console.log(authenticated);


  return (
    <div className="m-2">
      <Router>
        <Header />
        <Layout style={{ padding: '0 20px', marginTop: 30, marginBottom: 30 }}>
        <Switch>
          <PrivateRoute path="/lk" condition={authenticated} fallback="/login">
            <Profile />
          </PrivateRoute>
          <PrivateRoute
            path="/login"
            condition={!authenticated}
            fallback="/lk"
          >
            <LoginForm />
          </PrivateRoute>
          <PrivateRoute
            path="/signup"
            condition={!authenticated}
            fallback="/lk"
          >
            <SignUp user={user} />
          </PrivateRoute>
          <PrivateRoute
            path="/main"
            condition={!authenticated}
            fallback="/login"
          >
            <Main />
          </PrivateRoute>
          <Route path="/warning">
            <Warning />
          </Route>
          <Route path="/succes">
            <SubmitSeccus />
          </Route>
          <Route path="/custom">
            <MainSignUp history={history} />
          </Route>
          <Route path="/admin">
            <AdminCab/>
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
    </Layout>
      </Router>
    </div>
  );
}

export default App;
