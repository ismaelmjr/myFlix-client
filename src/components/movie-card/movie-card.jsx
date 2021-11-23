import React from "react"; //imported react to the component file.

class MovieCard extends React.Component { //created a component called moviecard.
    render() {
        const {movieData, onMovieClick} = this.props; //got the title of the movie in this from the array of objects.
        return <div className ="movie-card" onClick={() => {onMovieClick(movieData);}}>{movieData.Title}</div>;
    }
}

export default MovieCard;