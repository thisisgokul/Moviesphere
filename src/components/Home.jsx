import Cards from "./Cards";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Row, Col } from "react-bootstrap/";
import Carousel from "react-bootstrap/Carousel";
import YouTube from "react-youtube";
import { React, useEffect, useState } from "react";
import axios from "axios";

import "../components/App.css";

const API_KEY = "57d1f9b8dd0d56da487cfda0ff6fc323";

const Home = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const [displayMovies, setdisplayMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectMovies, setSelectMovies] = useState({});
  const [playTrailer, setplayTrailer] = useState(false);

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setdisplayMovies(results);
    await selectTrailerMovie(results[0]);
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });
    return data;
  };

  const selectTrailerMovie = async (movie) => {
    setplayTrailer(false);
    const data = await fetchMovie(movie.id);
    setSelectMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onSearch = (event) => {
    event.preventDefault();
    fetchMovies(search);
  };

  const renderTrailer = () => {
    const trailer = selectMovies.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    const key = trailer ? trailer.key : selectMovies.videos.results[0];

    return (
      <Col
        sm={12}
        md={12}
        lg={12}
        className="d-flex justify-content-center my-5"
      >
        <YouTube
          className=" youtbeplayer my-4"
          videoId={key}
          opts={{
            width: "100%",
            height: "600px",
          }}
        />
      </Col>
    );
  };
  return (
    <div>
      <Navbar className="navclr" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <h1 className="heading">
              MOvie<span style={{ color: "red" }}>S</span>phere
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form onSubmit={onSearch} className="d-flex justify-content-end">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 searchBar"
                aria-label="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <Button type="submit" variant="outline-success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ position: "relative" }}>
        <img
          className="d-block w-100 "
          style={{ height: "800px", borderRadius: "26px" }}
          src={`${IMAGE_PATH}${selectMovies.backdrop_path}`}
          alt="First slide"
        />

        <Carousel.Caption>
          {playTrailer ? (
            <button className="closebtn" onClick={() => setplayTrailer(false)}>
              Close
            </button>
          ) : null}
          {selectMovies.videos && playTrailer ? renderTrailer() : null}
          <Col sm={12} md={12} lg={12}>
            <button
              className="playtbtn text text-sm"
              onClick={() => setplayTrailer(true)}
            >
              Play Trailer
            </button>
            <h1 className="title display-4 display-md-3">
              {selectMovies.title}
            </h1>
            <p className="overview lead lead-md">
              {selectMovies.overview ? selectMovies.overview : null}
            </p>
          </Col>
        </Carousel.Caption>
      </div>

      <div className=" container container-fluid">
        <Row className="outer pt-4">
          {displayMovies.map((movie, index) => (
            <Col key={index} sm={3} md={3} lg={2}>
              <Cards movies={movie} selectMovie={selectTrailerMovie} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
