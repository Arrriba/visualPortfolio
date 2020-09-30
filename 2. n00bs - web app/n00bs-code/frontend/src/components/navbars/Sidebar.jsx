import React, { Component } from "react";
import "../../styles/components/Sidebar.scss";
import IGenre from "../../models/Genre.ts";
import $ from "jquery";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    genresList: [IGenre],
    clickedGenres: []
  };

  render() {
    return <div></div>;
  }
}

export default Sidebar;
