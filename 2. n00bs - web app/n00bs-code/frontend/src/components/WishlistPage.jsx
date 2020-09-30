import React, { Component } from "react";
import HeaderNavbar from "./navbars/HeaderNavbar";
import HomePage from "./HomePage";
import "../styles/components/Wishlist.scss";
import GameCard from "./GameCard";
import IGame from "../models/Game.ts";
import { Image, Col, Row, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { Service } from "../service/Service";
import { firebase, googleAuthProvider } from "../firebase/firebase";

class WishlistPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    gamesList: [IGame],
    currentPage: 1,
    gamesPerPage: 5,
    googleUser: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState(() => {
        return { googleUser: user };
      });
    });

    let eml = localStorage.getItem("email");

    Service.getUserByEmail(eml)
      .then(usr => {
        return usr.id;
      })
      .then(id_usr => {
        Service.getUserWishlist(id_usr)
          .then(res => {
            this.setState({
              gamesList: res
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  handleNextPage = () => {
    const indexOfLastGame = this.state.currentPage * this.state.gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - this.state.gamesPerPage;
    const games = this.state.gamesList;
    if (games.slice(indexOfFirstGame, indexOfLastGame).length != 0) {
      let nextPage = this.state.currentPage + 1;
      this.setState({
        currentPage: nextPage
      });
    }
  };

  handlePrevPage = () => {
    let prevPage = this.state.currentPage - 1;
    if (prevPage !== 0)
      this.setState({
        currentPage: prevPage
      });
  };

  render() {
    const indexOfLastGame = this.state.currentPage * this.state.gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - this.state.gamesPerPage;
    const currentGames = this.state.gamesList.slice(
      indexOfFirstGame,
      indexOfLastGame
    );

    return this.state.googleUser ? (
      <div className="Full-view">
        <Container>
          <Row noGutters>
            <HeaderNavbar />
          </Row>
          <Container className="Homepage-body">
            <Pagination className="Cards-container-wishlist">
              <Container>
                {this.state.gamesList &&
                  currentGames.map((game, index) => {
                    return (
                      <Pagination.Item
                        key={index}
                        className="gamecard-container"
                      >
                        <div>
                          <Link
                            to={{
                              pathname: "/game-page",
                              state: { game: game }
                            }}
                            className="gamecard-style"
                          >
                            <GameCard game={game} />
                          </Link>
                        </div>
                      </Pagination.Item>
                    );
                  })}
                <span className="arrows-container">
                  <Pagination.Prev
                    id="pgn-arr"
                    className="pagination-arrow"
                    onClick={this.handlePrevPage}
                  />
                  <Pagination.Next
                    id="pgn-arr"
                    className="pagination-arrow"
                    onClick={this.handleNextPage}
                  />
                </span>
              </Container>
            </Pagination>
          </Container>
        </Container>
      </div>
    ) : (
      <Link to={{ pathname: "/" }}>
        <HomePage />
      </Link>
    );
  }
}

export default WishlistPage;
