//import react to be able to create components in this file.
import React from 'react'; // import react to the file.
import axios from 'axios'; // import axios to the file to fetch movies from my external database.

import MovieCard from '../movie-card/movie-card'; // Import moviecard to the main view.
import MovieView from '../movie-view/movie-view'; // Import movieview to the main view.


// create a class component with the name 'MainView', that can be exported and imported in other files.
class MainView extends React.Component {
    constructor(){ // Is the entry point for the component.
        super(); // The super function is needed to be able to use this.state. It initializes the components state.
        this.state = {
          // code executed right when the component is created in the memory.
          movies: [],         
          selectedMovie: null
        }
      }

      componentDidMount(){ // fetch movies from database using the componentDidMount method.
        //code executed right after the component is added to the DOM.
        axios.get('https://topimdbmovies.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log('error');
        });
      }

      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      render() {
        const {movies, selectedMovie} = this.state; //destructuring the array movies. Also used with Objects.

        if (movies.length === 0) return <div className="main-view" />;
        
          return (
            <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {this.setSelectedMovie(movie)}}/>
          ))
        }
      </div>
    );
      }
}

export default MainView; // Export the MainView to be able to use in other files within the application.