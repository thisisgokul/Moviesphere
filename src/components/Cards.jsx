import React from "react";
import { motion } from "framer-motion";
import "../components/App.css";
const Cards = ({ movies, selectMovie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  return (
    <main>
      <motion.div
        style={{
          fontSize: 12,
          borderRadius: 30,
          backgroundColor: "black",
        }}
        whileHover={{ scale: 0.8 }}
        onClick={() => selectMovie(movies)}
      >
        {movies.poster_path ? (
          <a href="#">
            <img
              className="movie-cover"
              src={`${IMAGE_PATH}${movies.poster_path}`}
            />
          </a>
        ) : (
          <img
            className="Nomovie-cover"
            src="https://via.placeholder.com/400"
          />
        )}
        <h5 className="movie-title">{movies.title}</h5>
        <h5 className="movie-title">{movies.name}</h5>
      </motion.div>
    </main>
  );
};

export default Cards;
