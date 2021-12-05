import React from "react"; //imported react to the movie card file.
import PropTypes from "prop-types"; // import proptypes to the movie card.
import { Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-card.scss";

class MovieCard extends React.Component {
  //created a component called moviecard.
  render() {
    const { movie } = this.props; //got the title of the movie in this from the array of objects.
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default MovieCard;
