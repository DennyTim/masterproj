import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends Component {
  constructor() {
    super()


    this.state = {
      currentUser: null
    }

  }

  unsubsucribeFromAuth = null;

  componentDidMount() {
    this.unsubsucribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const useRef = await createUserProfileDocument(userAuth);

        useRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log(this.state);
        })
      }

      this.setState({ currentUser: userAuth })
    });
  };

  componentWillUnmount() {
    this.unsubsucribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          {/*только наш компонент домашней страницы 
          получает доступ к реквизиту истории, потому 
          используем hoc withRouter()*/}
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div >
    )
  }
}

export default App;
