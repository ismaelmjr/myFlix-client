//import react to be able to create components in this file.
import React from "react"; // import react to the file.
import axios from "axios"; // import axios to the file to fetch movies from my external database.

import LoginView from "../login-view/login-view"; //Import the loginview to the main view.
import RegistrationView from "../regestration-view/registration-view"; // Import th registrationview to the main view.
import MovieCard from "../movie-card/movie-card"; // Import moviecard to the main view.
import MovieView from "../movie-view/movie-view"; // Import movieview to the main view.
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./main-view.scss";

// create a class component with the name 'MainView', that can be exported and imported in other files.
class MainView extends React.Component {
  constructor() {
    // Is the entry point for the component.
    super(); // The super function is needed to be able to use this.state. It initializes the components state.
    this.state = {
      // code executed right when the component is created in the memory.
      // initial state set to null, and empty array.
      movies: [],
      user: null,
      // register: null,
    };
  }

  componentDidMount() {
    // fetch movies from database using the componentDidMount method.
    //code executed right after the component is added to the DOM.
    axios
      .get("https://topimdbmovies.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log("error");
      });

    //Every time a user loads the page and the componentDidMount method is called, you check if the user is logged in (by retrieving this information from localStorage). Only if the user is already logged in do you make the same GET request to the “movies” endpoint (by calling the getMovies method).
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  // When a user successfully logs in, this function updates the `user` property in state to that *particular user*.
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://topimdbmovies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Container>
          <Row className="main-view justify-content-md-center">
            <Routes>
              <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );

                  if (movies.length === 0) return <div className="main-view" />;
                  return movies.map((movie) => (
                    <Col md={3} key={movie._id}>
                      <MovieCard movie={movie} />
                    </Col>
                  ));
                }}
              />
              <Route
                exact
                path="/movies/:movieId"
                render={({ match, history }) => {
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <MovieView
                        movie={movies.find(
                          (m) => m._id === match.params.movieId
                        )}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              {/* <Route
                exact
                path="/genre/:name"
                render={({ match, history }) => {
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <GenreView
                        genre={
                          movies.find((m) => m.Genre.Name === match.params.name)
                            .Genre
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                exact
                path="/directors/:name"
                render={({ match, history }) => {
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <DirectorView
                        director={
                          movies.find(
                            (m) => m.Director.Name === match.params.name
                          ).Director
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              /> */}
            </Routes>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default MainView; // Export the MainView to be able to use in other files within the application.
