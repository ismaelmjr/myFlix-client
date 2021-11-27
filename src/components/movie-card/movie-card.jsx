import React from "react"; //imported react to the movie card file.
import PropTypes from "prop-types"; // import proptypes to the movie card. 

class MovieCard extends React.Component { //created a component called moviecard.
    render() {
        const {movie, onMovieClick} = this.props; //got the title of the movie in this from the array of objects.
        return <div className ="movie-card" onClick={() => {onMovieClick(movie);}}>{movie.Title}</div>;
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title:  PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }),
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};

export default MovieCard;