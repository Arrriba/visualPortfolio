import React, { Component } from "react";
import HeaderNavbar from "./navbars/HeaderNavbar";
import { Image, Col, Row, Container } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import "../styles/components/GamePage.scss";
import { Service } from "../service/Service";
import ReactRatings from "react-ratings-declarative";
import IGameReview from "../models/GameReview.ts";
import { firebase, googleAuthProvider } from "../firebase/firebase";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      user: null,
      googleUser: null,
      game: this.props.location.state.game,
      isInWishlist: false,
      rating: 0,
      review: "",
      gameReviews: [IGameReview],
      reviewAdded: false,
      link: []
    };
  }

  onStorage = () => {
    this.setState({
      email: localStorage.getItem("email")
    });
  };

  handleRatingChange = event => {
    this.setState({
      rating: event
    });
  };

  handleSubmitRatingAndReview = event => {
    event.preventDefault();

    Service.addRatingAndReview(
      this.state.user.id,
      this.state.game.id,
      this.state.rating,
      this.state.review
    )
      .then(() => {
        let id = this.state.game.id;
        this.getDetailedGame();
        Service.getGameReviews(id)
          .then(res => {
            this.setState({
              gameReviews: res,
              reviewAdded: true
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    this.setState({
      rating: 0,
      review: ""
    });
  };

  handleChangeReviewText = event => {
    this.setState({
      review: event.target.value
    });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState(() => {
        return { googleUser: user };
      });
    });

    let email = localStorage.getItem("email");
    this.setState({
      email: email,
      game: this.props.location.state.game
    });

    this.getUsrAndState(email);
    this.getGameReviews();
    this.getReviewAddedState(email, this.props.location.state.game.id);
    this.getDetailedGame(this.props.location.state.game.id);
    this.getGameLink(this.props.location.state.game.id);
  }

  getReviewAddedState = (email, id_game) => {
    Service.getUserByEmail(email)
      .then(res => {
        Service.getUserReview(id_game, res.id)
          .then(ress => {
            if (ress.length != 0) {
              this.setState({
                reviewAdded: true
              });
            } else {
              this.setState({
                reviewAdded: false
              });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  getUsrAndState = email => {
    Service.getUserByEmail(email)
      .then(usr => {
        this.setState({
          user: usr
        });
        return usr.id;
      })
      .then(id_usr => {
        Service.isInWishlist(id_usr, this.props.location.state.game.id)
          .then(() => {
            this.setState({
              isInWishlist: true
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  addToWishlist = () => {
    let mail = this.state.email;
    Service.getUserByEmail(mail)
      .then(usr => {
        return usr.id;
      })
      .then(id_usr => {
        Service.addToWishlist(id_usr, this.state.game.id)
          .then()
          .catch(err => console.log(err));
        this.setState({
          isInWishlist: true
        });
      })
      .catch(err => console.log(err));
  };

  removeFromWishlist = () => {
    let mail = this.state.email;
    Service.getUserByEmail(mail)
      .then(usr => {
        return usr.id;
      })
      .then(id_usr => {
        Service.removeFromWishlist(id_usr, this.state.game.id).then(() => {
          this.setState({
            isInWishlist: false
          });
        });
      })
      .catch(err => console.log(err));
  };

  getGameReviews = () => {
    let id = this.state.game.id;
    Service.getGameReviews(id)
      .then(res => {
        this.setState({
          gameReviews: res
        });
      })
      .catch(err => console.log(err));
  };

  getDetailedGame = () => {
    let id = this.state.game.id;
    Service.getDetailedGame(id)
      .then(res => {
        this.setState({
          game: res
        });
      })
      .catch(err => console.log(err));
  };

  getGameLink = id => {
    Service.getGameLinks(id)
      .then(res => {
        this.setState({
          link: res[0]
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const game = this.props.location.state.game;
    return (
      <div className="Full-view">
        <Container>
          <Row noGutters>
            <HeaderNavbar />
          </Row>
          <Container className="Game-div-container">
            <Row className="Game-div justify-content-center" noGutters>
              <Col md={4}>
                <Image
                  className="Game-image"
                  src={game.cover_url}
                  alt="Game Image"
                ></Image>
              </Col>
              <Col md={8} className="game-page-content">
                <h1 className="game-page-title">
                  {game.name}
                  {this.state.googleUser && (
                    <a
                      onClick={
                        this.state.isInWishlist
                          ? this.removeFromWishlist
                          : this.addToWishlist
                      }
                      title={
                        this.state.isInWishlist
                          ? "remove from wishlist"
                          : "add to wishlist"
                      }
                    >
                      <Image
                        className={"addWishlist-img-style"}
                        alt="addToWishlist"
                        src={
                          !this.state.isInWishlist
                            ? require("../images/stars.png")
                            : require("../images/stars_added.png")
                        }
                      ></Image>
                    </a>
                  )}
                </h1>
                <h6>{game.release_date}</h6>
                <StarRatings
                  rating={this.state.game.rating && this.state.game.rating}
                  starRatedColor="#F86210"
                  numberOfStars={5}
                  name="rating"
                  starDimension="15px"
                  starSpacing="2px"
                />
                <br />
                <span>
                  Genre:{" "}
                  {this.state.game.genreEntityList &&
                    this.state.game.genreEntityList.map((x, index) => {
                      if (index != this.state.game.genreEntityList.length - 1)
                        return x.name + ", ";
                      else {
                        return x.name;
                      }
                    })}
                </span>
                <br />
                <span>
                  Platforms:{" "}
                  {this.state.game.platformEntityList &&
                    this.state.game.platformEntityList.map((x, index) => {
                      if (
                        index !=
                        this.state.game.platformEntityList.length - 1
                      )
                        return x.name + ", ";
                      else {
                        return x.name;
                      }
                    })}
                </span>
                <br />
                <span>
                  Companies:{" "}
                  {this.state.game.companyEntityList &&
                    this.state.game.companyEntityList.map((x, index) => {
                      if (index < 2) {
                        if (
                          index !=
                          this.state.game.platformEntityList.length - 1
                        )
                          return x.company + ", ";
                        else {
                          return x.company;
                        }
                      } else if (index === 2) {
                        return x.company;
                      }
                    })}
                </span>
                <br />
                <span>
                  Buy from:{" "}
                  {this.state.link && (
                    <a href={this.state.link.link}>
                      {this.state.link.domain_name}
                    </a>
                  )}
                </span>

                <br />
                <br />

                <p>{game.summary}</p>
              </Col>
            </Row>
            {this.state.googleUser &&
              (!this.state.reviewAdded ? (
                <Row className="review-div centered" noGutters>
                  <label className="game-page-leave-rev">Leave a rating:</label>
                  <form onSubmit={this.handleSubmitRatingAndReview}>
                    <span className="ratings">
                      <ReactRatings
                        id="rate"
                        name="rate"
                        rating={this.state.rating}
                        changeRating={this.handleRatingChange}
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
                    {this.state.rating !== 0 && (
                      <div className="game-page-content review">
                        Write a review:
                      </div>
                    )}
                    <div className="review">
                      {this.state.rating !== 0 && (
                        <div>
                          <textarea
                            review={this.state.review}
                            onChange={this.handleChangeReviewText}
                          />
                        </div>
                      )}
                      {this.state.rating !== 0 && (
                        <input
                          className="submit-input"
                          type="submit"
                          value="Submit"
                        />
                      )}
                    </div>
                  </form>
                </Row>
              ) : (
                <Row className="review-div-added centered" noGutters>
                  {" "}
                  <div className="game-page-content review">
                    Already reviewed!
                  </div>
                </Row>
              ))}
            {this.state.gameReviews &&
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
              })}
          </Container>
        </Container>
      </div>
    );
  }
}

export default GamePage;
