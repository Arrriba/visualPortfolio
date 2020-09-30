import React, { Component } from "react";
import HeaderNavbar from "./navbars/HeaderNavbar";
import { Image, Row, Container, Col } from "react-bootstrap";
import "../styles/components/UserPage.scss";
import "../styles/components/GamePage.scss";
import { firebase, googleAuthProvider } from "../firebase/firebase";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import { Service } from "../service/Service";
import ReactRatings from "react-ratings-declarative";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 0,
      googleUser: null,
      url: null,
      gameReviews: [],
      getReviews: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState(() => {
        return { googleUser: user };
      });
    });
    this.setState({
      user: localStorage.getItem("username"),
      googleUser: localStorage.getItem("user"),
      url: localStorage.getItem("url")
    });

    Service.getUserByEmail(localStorage.getItem("email"))
      .then(usr => {
        var idu = usr.id;
        Service.getAllUserReviews(idu)
          .then(res => {
            this.setState({
              gameReviews: res
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
  }

  render() {
    return this.state.googleUser ? (
      <div className="Full-view">
        <Container>
          <Row noGutters>
            <HeaderNavbar />
          </Row>
          <Container>
            <Row className="Game-div justify-content-center" noGutters>
              <Col>
                <img
                  className="profile-picture"
                  src="images/userLogo.png"
                ></img>
              </Col>
              <Col className="center-items">
                <div className="center-items">{this.state.user}</div>
              </Col>
            </Row>
            <Row className="Game-div justify-content-center" noGutters>
              <Col className="center-items">
                <a href="/wishlist">
                  <button
                    type="button"
                    className="user-page-btn user-page-btn-2 user-page-btn-2g"
                  >
                    Wishlist
                  </button>
                </a>
              </Col>

              <Col className="center-items justify-content-end">
                <button
                  type="button"
                  onClick={() =>
                    this.setState({ getReviews: !this.state.getReviews })
                  }
                  className="user-page-btn user-page-btn-2 user-page-btn-2g"
                >
                  Reviews
                </button>
              </Col>
            </Row>
          </Container>
          {this.state.getReviews
            ? this.state.gameReviews &&
              this.state.gameReviews.map((rev, index) => {
                return (
                  <Row className="more-info-div" noGutters>
                    {rev.review}
                    <span className="ratings">
                      <ReactRatings
                        id="rate"
                        name="rate"
                        rating={rev.rating}
                        widgetRatedColors="orange"
                        widgetDimensions="25px"
                        widgetSpacings="5px"
                        widgetEmptyColors="#5396c2"
                      >
                        <ReactRatings.Widget
                          widgetHoverColor="orange"
                          svgIconViewBox="0 0 20 20"
                          svgIconPath="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"
                        />
                        <ReactRatings.Widget
                          widgetHoverColor="orange"
                          svgIconViewBox="0 0 20 20"
                          svgIconPath="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"
                        />
                        <ReactRatings.Widget
                          widgetHoverColor="orange"
                          svgIconViewBox="0 0 20 20"
                          svgIconPath="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"
                        />
                        <ReactRatings.Widget
                          widgetHoverColor="orange"
                          svgIconViewBox="0 0 20 20"
                          svgIconPath="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"
                        />
                        <ReactRatings.Widget
                          widgetHoverColor="orange"
                          svgIconViewBox="0 0 20 20"
                          svgIconPath="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"
                        />
                      </ReactRatings>
                    </span>
                  </Row>
                );
              })
            : null}
        </Container>
      </div>
    ) : (
      <Link to={{ pathname: "/" }}>
        <HomePage />
      </Link>
    );
  }
}
export default UserPage;
