//import react to be able to create components in this file.
import React from 'react'; // import react to the file.
import axios from 'axios'; // import axios to the file to fetch movies from my external database.

import LoginView from '../login-view/login-view'; //Import the loginview to the main view.
import RegistrationView from '../regestration-view/registration-view'; // Import th registrationview to the main view.
import MovieCard from '../movie-card/movie-card'; // Import moviecard to the main view.
import MovieView from '../movie-view/movie-view'; // Import movieview to the main view.


// create a class component with the name 'MainView', that can be exported and imported in other files.
class MainView extends React.Component {
    constructor(){ // Is the entry point for the component.
        super(); // The super function is needed to be able to use this.state. It initializes the components state.
        this.state = {
          // code executed right when the component is created in the memory.
          // initial state set to null, and empty array.
          movies: [],         
          selectedMovie: null,
          user: null
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

      // When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie.
      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      // When a user successfully logs in, this function updates the `user` property in state to that *particular user*.
      onLoggedIn(user){
        this.setState({user});
      }

      onRegistration(register){
        this.setState({register});
      }

      render() {
        const {movies, selectedMovie, user, register} = this.state; //destructuring the array movies. Also used with Objects.

       
        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!register) return <RegistrationView onRegistration= {register => this.onRegistration(register)} />;
        
        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;
        
        // If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned
          return (
            <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => 
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {this.setSelectedMovie(movie)}}/>
          )
        }
      </div>
    );
      }
}

export default MainView; // Export the MainView to be able to use in other files within the application.