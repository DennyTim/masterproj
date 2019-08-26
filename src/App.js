import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./components/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends Component {
  unsubsucribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubsucribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const useRef = await createUserProfileDocument(userAuth);

        useRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubsucribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          {/*только наш компонент домашней страницы 
          получает доступ к реквизиту истории, потому 
          используем hoc withRouter()*/}
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
