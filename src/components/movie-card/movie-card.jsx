import React from "react"; //imported react to the component file.

class MovieCard extends React.Component { //created a component called moviecard.
    render() {
        const {movie, onMovieClick} = this.props; //got the title of the movie in this from the array of objects.
        return <div className ="movie-card" onClick={() => {onMovieClick(movie);}}>{movie.Title}</div>;
    }
}

export default MovieCard;