import React, { Component } from "react";
import HeaderNavbar from "./navbars/HeaderNavbar";
import Sidebar from "./navbars/Sidebar";
import "../styles/components/HomePage.scss";
import "../styles/components/Sidebar.scss";

import GameCard from "./GameCard";
import GamePage from "./GamePage";
import ILiveSearch from "../models/LiveSearch";
import IGenre from "../models/Genre.ts";
import { Service } from "../service/Service";
import IGame from "../models/Game.ts";
import { Image, Col, Row, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import ReactLiveSearch from "react-live-search";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.getGames = this.getGames.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.handleGenreClick = this.handleGenreClick.bind(this);

    this.state = {
      value: "",
      searchList: [],
      gamesList: [IGame],
      currentPage: 1,
      gamesPerPage: 5,
      genresList: [IGenre],
      clickedGenres: [],
      filtered: false,
      clickedGame: null
    };
  }

  componentDidMount() {
    this.getGames()
      .then(res => {
        this.setState({
          gamesList: res
        });
      })
      .catch(err => console.log(err));
    Service.getGenres()
      .then(res => {
        res.sort((a, b) => a.name > b.name);
        this.setState({
          genresList: res
        });
      })
      .catch(err => console.log(err));
    this.getGames().then(res => {
      let items = res.map((r, i) => {
        return { label: r.name, value: r };
      });
      this.setState({
        searchList: items
      });
    });
  }

  handleNextPage = () => {
    let nextPage = this.state.currentPage + 1;
    this.setState({
      currentPage: nextPage
    });
  };

  handlePrevPage = () => {
    let prevPage = this.state.currentPage - 1;
    if (prevPage !== 0)
      this.setState({
        currentPage: prevPage
      });
  };

  getGames() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8080/backend/noobs-api/game/all")
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  handleGenreClick(id) {
    var g_list = this.state.clickedGenres;
    var contains = false;
    for (var i = 0; i < g_list.length; i++) {
      if (g_list[i] === id) contains = true;
    }
    if (!contains) {
      g_list.push(id);
    } else {
      if (g_list.length === 1) {
        g_list = [];
      } else {
        var new_list = [];

        for (var i = 0; i < g_list.length; i++) {
          if (g_list[i] !== id) new_list.push(g_list[i]);
        }
        g_list = new_list;
      }
    }
    this.setState({
      clickedGenres: g_list
    });
    if (g_list.length !== 0) {
      Service.getGamesByGenres(g_list)
        .then(res => {
          this.setState({
            filtered: true,
            gamesList: res
          });
        })
        .catch(err => console.log(err));
    } else {
      this.getGames()
        .then(res => {
          this.setState({
            gamesList: res,
            filtered: false
          });
        })
        .catch(err => console.log(err));
    }
  }

  getGenres() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8080/backend/noobs-api/genre/all")
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  getDetailedGame = id => {
    Service.getDetailedGame(id)
      .then(res => {
        this.setState({
          clickedGame: res
        });
      })
      .catch(err => console.log(err));
  };

  onChange = value => {
    var games = this.state.searchList.map((x, i) => {
      return x.value;
    });
    if (value === "") {
      this.getGames()
        .then(res => {
          this.setState({
            value: "",
            gamesList: res
          });
        })
        .catch(err => console.log(err));
    } else {
      var list = [];
      for (var i = 0; i < games.length; i++) {
        if (games[i].name.toLowerCase().includes(value.toLowerCase()))
          list.push(games[i]);
      }
      this.setState({
        value,
        gamesList: list
      });
    }
  };

  onSelect = v => {};

  render() {
    let i = 0;
    const indexOfLastGame = this.state.currentPage * this.state.gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - this.state.gamesPerPage;
    const currentGames = this.state.gamesList.slice(
      indexOfFirstGame,
      indexOfLastGame
    );

    return (
      <div className="Full-view">
        <Container>
          <Row noGutters>
            <HeaderNavbar />
          </Row>
          <Container className="Homepage-body">
            <ul className="sidebar-style">
              {this.state.genresList &&
                this.state.genresList.map((genre, index) => {
                  return (
                    <li
                      class={
                        this.state.clickedGenres.includes(genre.id)
                          ? "sidebar-row row-active"
                          : "sidebar-row"
                      }
                      onClick={() => this.handleGenreClick(genre.id)}
                      className="sidebar-row"
                    >
                      {genre.name}
                    </li>
                  );
                })}
            </ul>
            <Pagination className="Cards-container">
              <Container className="live-search">
                <ReactLiveSearch
                  value={this.state.value}
                  onChange={this.onChange}
                  onSelect={this.onSelect}
                  data={this.state.searchList}
                ></ReactLiveSearch>
              </Container>
              <Container>
                {this.state.gamesList &&
                  (currentGames
                    ? currentGames.map((game, index) => {
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
                                className="gamecard-style" /*onClick={this.onCardClick}*/
                              >
                                <GameCard game={game} />
                              </Link>
                            </div>
                          </Pagination.Item>
                        );
                      })
                    : this.handlePrevPage)}
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
    );
  }
}
