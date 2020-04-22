import React from "react";
import HomePage from "./pages/HomePageComponents/homepage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import Shop from "./pages/shop/shop.component";
import Header from "./components/header/header.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/users/user.actions";
class App extends React.Component {
  unSubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }

      setCurrentUser({ currentUser: userAuth });
    });
  }
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
  checkProperties = (obj) => {
    debugger;
    for (var key in obj) {
      if (obj[key] !== null) return false;
    }
    return true;
  };
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={Shop}></Route>
          <Route
            exact
            path="/signin"
            render={() =>
              this.checkProperties(this.props.currentUser) == false ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          ></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
