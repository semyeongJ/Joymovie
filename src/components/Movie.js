import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/Movie.css";

function Movie({ id, coverImg, title, summary, genres, year }) {
  return (
    <div className="movie">
      <img src={coverImg} alt={title} title={title} />
      <div className="movie_data">
        <h2 className="movie_title">
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h4 className="movie_year">{year}</h4>
        <ul className="movie_genres">
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p className="movie_summary">{summary.slice(0, 200)}...</p>
      </div>
    </div>
  );
}
Movie.prototypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
