import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Detail.css";
import Home from "./Home";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };
  const navigate = useNavigate();
  const navigateBtn = () => {
    navigate(-1);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loader">
          <span className="loader_text">Enjoy the movie!</span>
        </div>
      ) : (
        <div className="detail">
          <button onClick={navigateBtn} className="custom-btn btn-16">
            back
          </button>
          <h2 className="detail_title">{movie.title_long}</h2>
          <div className="detail_img">
            <img src={movie.large_cover_image} alt={movie.title} title={movie.title} />
          </div>
          <div className="detail_data">
            <ul>
              <li>Genre: {movie.genres.map((genre) => `${genre} `)}</li>
              <li>Language: {movie.language}</li>
              <li>Runtime: {movie.runtime} minutes</li>
              <li>Rating: {movie.rating} / 10</li>
              <li>Summary: {movie.description_full}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
