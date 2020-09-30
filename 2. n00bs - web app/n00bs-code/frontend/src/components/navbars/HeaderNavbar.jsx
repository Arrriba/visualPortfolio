import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "../../styles/components/HeaderNavbar.scss";
import { Image, Col, Row, Container } from "react-bootstrap";
import { firebase, googleAuthProvider } from "../../firebase/firebase";
import { Service } from "../../service/Service";

class HeaderNavbar extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    user: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState(() => {
        return { user: user };
      });
    });
  }

  addUser() {
    let eml = localStorage.getItem("email");

    Service.getUserByEmail(eml)
      .then(usr => {
        return usr;
      })
      .catch(err => {
        var username = localStorage.getItem("username");
        var uid = localStorage.getItem("uid");
        var email = localStorage.getItem("email");

        Service.addUser(username, email, uid)
          .then()
          .catch(err => console.log(err));
      });
  }

  onClickLogin() {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(() => {
        var user = firebase.auth().currentUser;
        var url = firebase.auth().currentUser.photoURL.toString();
        var name = user.displayName;
        localStorage.setItem("user", user);
        localStorage.setItem("url", url);
        var email = user.email;
        var uid = user.uid;
        const userDto = {
          username: name,
          email: email,
          uid: uid
        };
        if (localStorage.getItem("email") == null) {
          localStorage.setItem("email", email);
          localStorage.setItem("username", name);
          localStorage.setItem("uid", uid);
        }

        this.addUser();
      });
  }

  onClickLogout() {
    firebase.auth().signOut();
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("uid");
    localStorage.removeItem("user");
  }

  render() {
    return (
      <Container>
        <Row noGutters className="toolbar-style">
          <Col md="5" sm="6" className="">
            <Tooltip title="home">
              <a href="/">
                <Image
                  className="logo-img-style"
                  alt="logo"
                  src={require("../../images/logo.png")}
                ></Image>
              </a>
            </Tooltip>
          </Col>

          <Col
            md="7"
            sm="6"
            className="justify-content-right"
            className="nav-div-right"
          >
            <div className="float-right navbar-icons">
              {this.state.user && (
                <a href="/user-page">
                  <div className="user-name">
                    {this.state.user.displayName.toUpperCase()}
                  </div>
                </a>
              )}
              {!this.state.user && (
                <button
                  className="btn btn-2 btn-2g"
                  onClick={() => this.onClickLogin()}
                >
                  <img src="https://img.icons8.com/small/16/000000/google-logo.png" />
                  <b>Login</b>
                </button>
              )}
              {this.state.user && (
                <button
                  className="btn btn-2 btn-2g"
                  onClick={() => this.onClickLogout()}
                >
                  <b>Log out</b>
                </button>
              )}
              {this.state.user && (
                <Tooltip title="wishlist">
                  <a href="/wishlist">
                    <Image
                      className="wishlist-img-style"
                      alt="wishlist"
                      src={require("../../images/starr.png")}
                    ></Image>
                  </a>
                </Tooltip>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HeaderNavbar;
