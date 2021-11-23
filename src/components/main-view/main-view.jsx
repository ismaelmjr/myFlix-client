//import react to be able to create components in this file.
import React from 'react';
import MovieCard from '../movie-card/movie-card'; // Import moviecard to the main view.
import MovieView from '../movie-view/movie-view';


// create a class component with the name 'MainView', that can be exported and imported in other files.
class MainView extends React.Component {
    constructor(){ // Is the entry point for the component.
        super(); // The super function is needed to be able to use this.state. It initializes the components state.
        this.state = {
          movies: [
            { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg'},
            { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX67_CR0,0,67,98_AL_.jpg'},
            { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX67_CR0,0,67,98_AL_.jpg'}
          ],
          selectedMovie: null
        }
      }
      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      render() {
        const {movies, selectedMovie} = this.state; //destructuring the array movies. Also used with Objects.

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
        
          return (
            <div className="main-view">
        {selectedMovie
          ? <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
      }
}

export default MainView; // Export the MainView to be able to use in other files within the application.