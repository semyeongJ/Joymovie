import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Detail.css";

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
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className="container">
      {loading ? (
        <div className="loader">
          <span className="loader_text">Loading...</span>
        </div>
      ) : (
        <div style={{ height: "500px", width: "1000px" }}>
          <h2>{movie.title_long}</h2>
          <div style={{ float: "left", display: "inline" }}>
            <img src={movie.medium_cover_image} alt={movie.title} />
          </div>
          <div style={{ wordBreak: "break-all", position: "relative", left: "30px" }}>
            <ul>
              <li>Genre: {movie.genres.map((genre) => `${genre},`)}</li>
              <li>Language: {movie.language}</li>
              <li>Runtime: {movie.runtime} minutes</li>
              <li>Rating: {movie.rating}/10</li>
              <li>Summary: {movie.description_full}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
