import React from "react"; //imported react to the movie card file.
import PropTypes from "prop-types"; // import proptypes to the movie card.
import { Card, Button } from "react-bootstrap";

import "./movie-card.scss";

class MovieCard extends React.Component {
  //created a component called moviecard.
  render() {
    const { movie, onMovieClick } = this.props; //got the title of the movie in this from the array of objects.
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            variant="primary"
            onClick={() => onMovieClick(movie)}
            variant="link"
          >
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default MovieCard;
