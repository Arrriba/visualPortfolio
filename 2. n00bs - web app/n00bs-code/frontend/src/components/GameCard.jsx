import React, { Component } from 'react';
import '../styles/components/GameCard.scss';
import '../models/Game.ts';
import StarRatings from 'react-star-ratings';
import { number } from 'prop-types';
import {Image, Col} from 'react-bootstrap';

class GameCard extends Component {

  state = {
    rating: number
  };

  render() {
    const game = this.props.game;
    return (
      <div className='gamecard-style'>

        <Col md={3} className="photo-container">
          <Image src={game.cover_url} className='gamecard-image'></Image>
        </Col>

        <Col md={9} className="content-container">
          <span className="title-rating">
            <div>
              <h1>{game.name}</h1>
            </div>
            <div>
              <StarRatings
                rating={game.rating}
                starRatedColor="#F86210"
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
                starDimension="15px"
                starSpacing="2px"
              />
            </div>

          </span>
          <div className="description-container">
            <p className="description">{game.summary}</p>
          </div>
        </Col>

      </div>
    );
  }
}

export default GameCard;